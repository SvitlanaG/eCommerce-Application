import { HandeChange } from '@/types/Props';

export const Languages = ({ handleChange }: HandeChange) => {
  return (
    <div className="languages">
      <p>Language</p>
      <ul>
        <li>
          <label htmlFor="english">
            <input
              type="radio"
              name="langauge"
              id="english"
              value="en-GB"
              onChange={(ev) => handleChange(ev)}
            />
            English
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
            German
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
            Russian
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Languages;
