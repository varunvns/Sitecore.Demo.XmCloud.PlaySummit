import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import search from '../../assets/img/search.svg';
import NextImage from 'next/image';

import { SearchResultData } from './SearchResult.mock-data';
import Link from 'next/link';
import SpinningLoader from 'components/CareConnect/SpinningLoader';
const SearchResult = (): JSX.Element => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [InputText, setInputText] = useState(searchQuery);
  const [loading, setLoading] = useState(false);
  const [loadedResultsCount, setLoadedResultsCount] = useState(0);

  const SearchResults = SearchResultData?.SearchResultList;

  useEffect(() => {
    setInputText(searchQuery);
    setLoadedResultsCount(searchQuery.length);
  }, [searchQuery]);

  const HandleInputText = (event: ChangeEvent<HTMLInputElement>) => {
    const NewValue = event.target.value;
    setInputText(NewValue);
    setLoading(true);
    setLoadedResultsCount(0);
  };

  const HandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = '/Search?q=' + InputText;
  };

  const filteredSearchResults = SearchResults?.filter((SearchResult) =>
    SearchResult?.ResultTitle?.value?.toLowerCase().includes(InputText.toLocaleLowerCase())
  );
  useEffect(() => {
    if (loading && filteredSearchResults?.length > 0) {
      const loadResults = () => {
        if (loadedResultsCount < filteredSearchResults.length) {
          setTimeout(() => {
            setLoadedResultsCount((prevCount) => prevCount + 1);
          }, 300); // Adjust the delay time (in milliseconds) as needed
        } else {
          setLoading(false); // Stop loading once all results are displayed
        }
      };

      loadResults();
    }
  }, [loading, loadedResultsCount, filteredSearchResults]);
  return (
    <div className="container mx-auto py-10">
      <form onSubmit={HandleSubmit} autoComplete="off">
        <input
          type="text"
          name="search"
          value={InputText}
          placeholder="Search..."
          className="border-0 border-b-2 border-b-black-light focus:outline-0 w-full bg-transparent"
          id="search"
          onChange={HandleInputText}
        />
        <span className="absolute -rotate-45">
          <button type="submit">
            <NextImage
              src={search}
              width={18}
              height={18}
              alt="search icon"
              className="invert rotate-45"
            />
          </button>
        </span>
      </form>
      {filteredSearchResults.length == 0 ? (
        <div className="text-3xl font-bold py-4">No result found.</div>
      ) : (
        <>
          {loading && loadedResultsCount === 0 ? (
            <div className="flex justify-center items-center py-10">
              <SpinningLoader />
            </div>
          ) : (
            <div className="grid  gap-x-6 gap-y-6 py-6">
              {filteredSearchResults.length != 0 &&
                filteredSearchResults
                  ?.slice(0, loadedResultsCount)
                  ?.map((result, index: number) => {
                    return (
                      <div key={index} className="w-full p-2">
                        <Link href={result.ResultLink.value} className="decoration-black underline">
                          <h2 className="font-bold text-2xl ">{result.ResultTitle.value}</h2>
                        </Link>
                        <p>{result?.ResultDescription?.value}</p>
                      </div>
                    );
                  })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
