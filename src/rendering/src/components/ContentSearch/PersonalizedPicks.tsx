import { WidgetDataType, widget } from '@sitecore-search/react';
import { Image } from '@sitecore-jss/sitecore-jss-nextjs';

type PersonalizedPick = {
  id: string;
  displayName?: string;
  fields: {
    description: { value: string };
    image_url: { value: string };
    name: { value: string };
  };
  url?: string;
};

export type PersonalizedPicksProps = {
  title?: string;
  itemsToDisplay?: number;
  sxaStyles?: string;
  abc?: { Cards: PersonalizedPick[] }[];
};

const PersonalizedPicks = ({ sxaStyles = '', abc }: PersonalizedPicksProps) => {
  const cards = abc[0]?.Cards || [];
  return (
    <div className={`personalized-picks ${sxaStyles}`} data-abc={JSON.stringify(abc)}>
      <div className="container flex justify-between gap-4 flex-wrap">
        {cards.map((item: PersonalizedPick) => (
          <div key={item?.id} className="flex flex-col w-full">
            <a className="item flex flex-col h-full text-decoration-none" href="#">
              <Image
                className="item-image w-full h-auto"
                field={item?.fields?.image_url}
                alt={item?.displayName}
              />
              <span className="item-name text-xl font-bold mt-2 flex-grow">
                {item?.fields?.name?.value}
              </span>
              <span className="item-desscription mb-5 text-base mt-2 flex-grow">
                {item?.fields?.description?.value}
              </span>
              <button className="dpworld-btn">Read more</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default widget(PersonalizedPicks, WidgetDataType.SEARCH_RESULTS, 'content');
