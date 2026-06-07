const Card = (props) => {
  return (
    <div
      draggable
      style={{
        border: "2px solid #b734",
        borderRadius: "40px",
        padding: "10px",
        backgroundColor: "#5ab2cb",
        color: "white",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <h4 style={{ borderBottom: "2px solid black", paddingBottom: "5px" }}>
        {props.title}
      </h4>
      <p>{props.description}</p>
    </div>
  );
};

export default Card;
