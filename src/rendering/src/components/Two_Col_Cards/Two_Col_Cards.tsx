import {
  Text,
  ImageField,
  Image,
  TextField,
  LinkField,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React from 'react';

// Define the types for the rendering fields
export type RenderingFields = {
  Title: TextField;
  SubTitle: TextField;
  Cards: Cards[];
};

export type Cards = {
  fields: {
    Image: ImageField;
    Title: TextField;
    Description: TextField;
    CTA: LinkField;
  };
};

// Extend the ComponentProps to include the rendering object
export type TwoColProps = ComponentProps & {
  rendering: {
    fields: RenderingFields;
  };
};

const Two_Col_Cards = (props: TwoColProps): JSX.Element => {
  return (
    <div className="TwoCol-Section container my-[50px] lg:my-[100px]">
      {props?.rendering?.fields && (
        <div className="TwoCol-Wrapper">
          <div className="TwoCol-Title mb-[30px]">
            <Text
              field={props?.rendering?.fields?.Title}
              tag="h2"
              className={'text-[27px] lg:text-[36px] font-bold leading-[48px] mb-[10px] uppercase'}
            />
          </div>
          <div className="TwoCol-Description">
            {props?.rendering?.fields?.SubTitle?.value !== '' && (
              <Text
                field={props?.rendering?.fields?.SubTitle}
                tag="div"
                className={
                  'text-[18px] font-normal leading-[28px] mb-[20px] text-[#555] text-justify'
                }
              />
            )}
          </div>
          {props?.rendering?.fields?.Cards && (
            <div className="TwoCol-Cards flex flex-col md:flex-row flex-grow w-full gap-5">
              {props?.rendering?.fields?.Cards.map((item: Cards, index: number) => {
                return (
                  <div className="TwoCol-Card md:w-1/2" key={index}>
                    {item?.fields?.Image && (
                      <div className="cardImage w-full">
                        <Image field={item?.fields?.Image} className={''} />
                      </div>
                    )}
                    <div className="article-detail pt-[30px]">
                      {item?.fields?.Title && (
                        <div className="cardTitle">
                          <Text
                            field={item?.fields?.Title}
                            tag="h2"
                            className={
                              'text-[24px] lg:text-[28px] font-bold leading-[32px] mb-[22px]'
                            }
                          />
                        </div>
                      )}
                      {item?.fields?.Description && (
                        <div className="cardDesc">
                          <Text
                            field={item?.fields?.Description}
                            tag="p"
                            className={
                              'text-[16px] lg:text-[18px] font-normal leading-[28px] mb-[20px] text-[#555] '
                            }
                          />
                        </div>
                      )}
                      {item?.fields?.CTA && (
                        <div className="cardCTA">
                          <Link field={item?.fields?.CTA} className="dpworld-btn" />
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

export default Two_Col_Cards;
