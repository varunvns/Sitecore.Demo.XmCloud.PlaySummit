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

export type DataSectionProps = ComponentProps & {
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Description: RichTextField;
  };
};

const DataSection = (props: DataSectionProps): JSX.Element => {
  return (
    <div className="ContentBlock-Section">
      {props?.rendering?.fields && (
        <div className="content">
          <div className="content-Title">
            <Text fields={props?.rendering?.fields?.Title} tag="p" />
          </div>
          <div className="content-Description">
            <RichText fields={props?.rendering?.fields?.Description} tag="div" />
          </div>
          <div className="content-Image">
            <Image fields={props?.rendering?.fields?.Image} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSection;
