import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });
  return (
    <>
      <div className="w-full text-base" {...getComboboxProps()}>
        <input
          className="p-2 border-2 rounded-lg"
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            // className: loading ? 'loading' : null,
          })}
        />
        <div {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <div
                className=" flex border-b-2 border-gray-200 hover:border-l-8 hover:bg-gray-100:bg-gray-100 selection::bg-gray-100 p-4 hover:pl-8 transition-all text-base"
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                <img
                  className="mr-2 max-h-8"
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                />
                {item.name}
              </div>
            ))}
          {isOpen && !items.length && !loading && (
            <div className="flex border-b-2 border-gray-200 p-4 transition-all text-base">
              Sorry, No items found for {inputValue}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
