import { ComponentProps } from 'lib/component-props';
import {
  Text,
  Field,
  LinkField,
  ImageField,
  Link,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type ThreeColumnsSectionProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    LeftLogo: ImageField;
    LeftTitle: Field<string>;
    LeftLink: LinkField;
    MiddleLogo: ImageField;
    MiddleTitle: Field<string>;
    MiddleLink: LinkField;
    RightLogo: ImageField;
    RightTitle: Field<string>;
    RightLink: LinkField;
    cta: LinkField;
  };
};

const ThreeColumnsSection = ({ fields }: ThreeColumnsSectionProps): JSX.Element => {
  return (
    <section className={`section dpworld-section`}>
      <div className="col-content container text-center">
        <h2 className=" dpworld-section-content-title">
          <Text field={fields.Title} />
        </h2>
        <p className="dpworld-section-content-p">
          <Text field={fields.Subtitle} />
        </p>
        {fields?.cta?.value?.href !== '' && <Link field={fields.cta} className="dpworld-btn" />}
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<ThreeColumnsSectionProps>(ThreeColumnsSection);
