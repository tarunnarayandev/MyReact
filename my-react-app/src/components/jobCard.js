import "./styles.css"

export const JobCard = ({ data }) => {
  const { by, id, score, time, title, type, url } = data;
  const date = new Date(1683838872 * 1000).toDateString()
  return (
    <div className="border-1 marginTop16" onClick={() => window.open("/products", "_blank")}>
      <p>{title}</p>
      <div  className="flex">
        <p>{by}</p>
        <p> {date}</p>
      </div>
    </div>
  );
};
