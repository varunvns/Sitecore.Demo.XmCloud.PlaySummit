import { Text, ImageField, Image, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React from 'react';

// Define the types for the rendering fields
export type RenderingFields = {
  Title: TextField;
  Cards: Cards[];
};

export type Cards = {
  fields: {
    Image: ImageField;
    Description: TextField;
  };
};

// Extend the ComponentProps to include the rendering object
export type ThreeCardsProps = ComponentProps & {
  rendering: {
    fields: RenderingFields;
  };
};

const ThreeCardsSection = (props: ThreeCardsProps): JSX.Element => {
  return (
    <div className="ThreeCards-Section container my-[50px] lg:mt-[100px]">
      {props?.rendering?.fields && (
        <div className="ThreeCards-Wrapper">
          <div className="ThreeCards-Title mb-[30px]">
            <Text
              field={props?.rendering?.fields?.Title}
              tag="h2"
              className={'text-[27px] lg:text-[36px] font-bold leading-[48px] mb-[38px] uppercase'}
            />
          </div>
          {props?.rendering?.fields?.Cards && (
            <div className="ThreeCards-Cards flex flex-col md:flex-row w-full flex-wrap justify-between items-stretch gap-4">
              {props?.rendering?.fields?.Cards.map((item: Cards, index: number) => {
                return (
                  <div
                    className="ThreeCards-Card w-full md:w-[32%] my-[20px] bg-[#fff] rounded-tl-[50px] p-[20px] lg:p-[30px]"
                    key={index}
                  >
                    {item?.fields?.Image && (
                      <div className="cardImage p-[20px] rounded-full bg-[#f8f8f8] h-[98px] w-[98px] place-content-center overflow-clip">
                        <Image field={item?.fields?.Image} className={'max-w-full rounded-full'} />
                      </div>
                    )}
                    <div className="article-detail pt-[30px] md:py-[40px] md:px-[20px] w-full">
                      {item?.fields?.Description && (
                        <div className="cardDesc">
                          <Text
                            field={item?.fields?.Description}
                            tag="p"
                            className={
                              'text-[16px] lg:text-[18px] font-normal leading-[32px] text-[#555] '
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThreeCardsSection;
