import Appbar from "../components/Appbar";
import Card from "../components/Card";
import CenterDiv from "../components/CenterDiv";

const Board = () => {
  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            flex: 1,
            borderRight: "2px dotted black",
            minHeight: "100vh",
            padding: "10px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Not Started</h4>
          <div>
            <Card
              title="Go to GYM"
              description="Lorem ipsum dolor, 
              sit amet consectetur adipisicing elit. 
              Nostrum, officiis dicta vel molestiae quaerat quam, 
              eius sint, fuga quidem ad ipsam error similique 
              nisi corporis!."
            />
            <Card
              title="Go to GYM"
              description="Lorem ipsum dolor, 
              sit amet consectetur adipisicing elit. 
              Nostrum, officiis dicta vel molestiae quaerat quam, 
              eius sint, fuga quidem ad ipsam error similique 
              nisi corporis!."
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            borderRight: "2px dotted black",
            minHeight: "100vh",
            padding: "10px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Pending</h4>
        </div>
        <div
          style={{
            flex: 1,
            minHeight: "100vh",
            padding: "10px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Completed</h4>
        </div>
      </div>
    </div>
  );
};

export default Board;
