import {
  Text,
  RichText,
  ImageField,
  Image,
  Field,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React from 'react';

// Define the types for the rendering fields
export type RenderingFields = {
  Title: Field<string>;
  Description: RichTextField;
  Image: ImageField;
};

// Extend the ComponentProps to include the rendering object
export type DataSectionProps = ComponentProps & {
  rendering: {
    fields: RenderingFields;
  };
};

const DataSection = (props: DataSectionProps): JSX.Element => {
  return (
    <div className="ContentBlock-Section container my-[50px] lg:my-[100px]">
      {props?.rendering?.fields && (
        <div className="content">
          <div className="content-Title">
            <Text
              field={props?.rendering?.fields?.Title}
              tag="h2"
              className={'text-[27px] lg:text-[37px] font-bold leading-[45px] mb-[25px] uppercase'}
            />
          </div>
          <div className="content-Description">
            <RichText
              field={props?.rendering?.fields?.Description}
              tag="div"
              className={
                'text-[18px] font-normal leading-[28px] mb-[20px] text-[#555] text-justify'
              }
            />
          </div>
          <div className="content-Image">
            <Image field={props?.rendering?.fields?.Image} className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSection;
