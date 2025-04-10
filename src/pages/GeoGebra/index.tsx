import React, { useEffect, useState } from "react";
import Geogebra from "react-geogebra";

const GeoGebraPage: React.FunctionComponent = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  const updateDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handleAppletLoad = () => {};

  return (
    <div className="row" style={{ width: "100%", height: "100%" }}>
      <div className="col-12" style={{ width: "100%", height: "100%" }}>
        <Geogebra
          id="geogebra-applet"
          appName="geometry"
          width={dimensions.width}
          height={dimensions.height}
          appletOnLoad={handleAppletLoad}
          showToolBar={true}
          showAlgebraInput={true}
          showMenuBar={true}
          reloadOnPropChange={true}
        />
      </div>
    </div>
  );
};

export default GeoGebraPage;
