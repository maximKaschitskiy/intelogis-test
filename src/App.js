import React from "react";
import shortid from "shortid";
import "./vendor/normalize.css";
import "./App.css";
import data from "./mock/dataset.json";
import SplitPane from "react-split-pane";
import OrderList from "./OrderList/OrderList";
import getRandom from "./utils/getRandom";
import { YMaps, Map } from "react-yandex-maps";

function App() {
  const [locationList, setLocationList] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const mapState = { center: [55.750625, 37.626], zoom: 10 };
  const [ymapsState, setYmapsState] = React.useState(null);
  const [currentRoute, setCurrentRoute] = React.useState();
  const [currentOrder, setCurrentOrder] = React.useState("");
  const mapRef = React.useRef(null);

  const yamapsKey = process.env.REACT_APP_YAMAP_KEY;

  React.useEffect(() => {
    const locations = data.map((item) => item.Cells.SIMPLE_ADDRESS);
    const sortLocations = Array.from(locations).sort((a, b) => a - b);
    setLocationList(sortLocations.sort((a, b) => a.localeCompare(b)));
    setOrders(
      Array.from(Array(10), () => ({
        from: locations[getRandom(0, locations.length)],
        to: locations[getRandom(0, locations.length)],
        id: shortid.generate(),
      }))
    );
  }, []);

  const addRoute = (order) => {
    if (ymapsState) {
      const pointA = "Москва " + order.from;
      const pointB = "Москва " + order.to;

      const multiRoute = new ymapsState.multiRouter.MultiRoute(
        {
          referencePoints: [pointA, pointB],
          params: {
            routingMode: "auto",
          },
        },
        {
          boundsAutoApply: true,
        }
      );

      setCurrentRoute(multiRoute);

      if (currentRoute) {
        mapRef.current.geoObjects.remove(currentRoute);
      }

      mapRef.current.geoObjects.add(multiRoute);
    }
  };

  function fitMap() {
    mapRef.current.container.fitToViewport();
  }

  function handleEditOrder(order) {
    setOrders((prevState) => {
      const newState = prevState.map((item) => {
        if (item.id === currentOrder.id) {
          return order;
        }
        return item;
      });
      return newState;
    });
    addRoute(order);
  }

  return (
    <div className="App">
      <header className="App-header" />
      <main className="main-page">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize={500}
          maxSize={650}
          onChange={()=>fitMap()}
        >
          <div className="list-wrapper">
            <OrderList
              orders={orders}
              getValues={(order) => addRoute(order)}
              locationList={locationList}
              editOrder={(order) => handleEditOrder(order)}
              setCurrentOrder={(order) => setCurrentOrder(order)}
              currentOrder={currentOrder}
            />
          </div>
          <div className="map-wrapper">
            <YMaps query={{ apikey: yamapsKey }}>
              <Map
                className={"map"}
                defaultState={mapState}
                modules={["multiRouter.MultiRoute"]}
                state={mapState}
                instanceRef={mapRef}
                onLoad={(ymaps) => setYmapsState(ymaps)}
              />
            </YMaps>
          </div>
        </SplitPane>
      </main>
    </div>
  );
}

export default App;
