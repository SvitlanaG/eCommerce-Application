export const Languages = () => {
  return (
    <div className="languages">
      <p>Language</p>
      <ul>
        <li>
          <label htmlFor="english">
            <input type="radio" name="langauge" id="english" value="German" />
            English
          </label>
        </li>
        <li>
          <label htmlFor="german">
            <input type="radio" name="langauge" id="german" value="german" />
            German
          </label>
        </li>
        <li>
          <label htmlFor="russian">
            <input type="radio" name="langauge" id="russian" value="german" />
            Russian
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Languages;
