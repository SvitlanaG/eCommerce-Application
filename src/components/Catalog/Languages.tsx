import { HandeChange } from '@/types/Props';

export const Languages = ({ handleChange }: HandeChange) => {
  return (
    <div className="languages">
      <p>Language</p>
      <ul>
        <li>
          <label htmlFor="all">
            <input
              type="radio"
              name="langauge"
              id="all"
              value="all"
              onChange={(ev) => handleChange(ev)}
            />
            <span>ALL</span>
          </label>
        </li>
        <li>
          <label htmlFor="english">
            <input
              type="radio"
              name="langauge"
              id="english"
              value="en-GB"
              onChange={(ev) => handleChange(ev)}
            />
            <span>English</span>
          </label>
        </li>
        <li>
          <label htmlFor="german">
            <input
              type="radio"
              name="langauge"
              id="german"
              value="de-DE"
              onChange={(ev) => handleChange(ev)}
            />
            <span>German</span>
          </label>
        </li>
        <li>
          <label htmlFor="russian">
            <input
              type="radio"
              name="langauge"
              id="russian"
              value="ru"
              onChange={(ev) => handleChange(ev)}
            />
            <span>Russian</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Languages;
