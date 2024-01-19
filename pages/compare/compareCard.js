import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { numInLakh } from "../../priceformat";
import Link from "next/link";
import { BiPlus, BiXCircle } from "react-icons/bi";
import Select from "react-select";
import { BiX, BiCheck } from "react-icons/bi";
import Head from "next/head";
import { baseUrl } from '/env';
function CompareCard({ data,preselectVarients }) {
  const [allbrands, setAllBrands] = useState();
  const [allmodels1, setAllmodels1] = useState();
  const [allvarients1, setAllvarients1] = useState();
  const [allmodels2, setAllmodels2] = useState();
  const [allvarients2, setAllvarients2] = useState();
  const [allmodels3, setAllmodels3] = useState();
  const [allvarients3, setAllvarients3] = useState();
  const [allmodels4, setAllmodels4] = useState();
  const [allvarients4, setAllvarients4] = useState();
  const [varientsData, setVarientData] = useState();
  const [configdata, setConfigdata] = useState();
  const [saftydata, setSaftydata] = useState();
  const [selectedVarients,setSelectedVarients] = useState();
  let filarray = [];

  useEffect(() => {
    let seperated_varients = []
    seperated_varients = preselectVarients?.split(", ")
    setSelectedVarients(seperated_varients)
  },[preselectVarients])
  useEffect(() => {
    let brands = [];
    if (data?.[0] != null) {
      setVarientData(data);
    }
    axios
      .get(
        `${baseUrl}/api/modelvarient/getbrandnames`
      )
      .then((res) => {
        brands = res.data.data.map((item) => {
          item["label"] = item["BrandName"];
          item["value"] = item["id"];
          delete item["BrandName"];
          delete item["id"];
          return item;
        });
        setAllBrands(res.data.data);
      });
  }, [data]);
  function specifications(spec = [], titleKey, contextKey) {
    if (spec.length == 0) {
      return "";
    }
    var temp = spec.find((element) => element.title == titleKey);
    var obj = temp.context.find((element) => element.key == contextKey);
    return obj.value || "";
  }
  const selectedBrand1 = (e) => {
    let models = [];
    axios
      .get(
        `${baseUrl}/api/products/getProductBasedOnbrand?products_brand=${e.value}`
      )
      .then((res) => {
        models = res.data.data.map((item) => {
          item["label"] = item["ProductName"];
          item["value"] = item["id"];
          delete item["ProductName"];
          delete item["id"];
          return item;
        });
        setAllmodels1(models);
      });
  };
  const selectedModel1 = (e) => {
    let varients = [];
    axios
      .get(
        `${baseUrl}/api/products/getVarientsBasedOnProducts?productName=${e.value}`
      )
      .then((res) => {
        varients = res.data.data[0].ModelVariantNameList.map((item) => {
          item["label"] = item["ModelVariantName"];
          item["value"] = item["id"];
          delete item["ModelVariantName"];
          delete item["id"];
          return item;
        });
        setAllvarients1(varients);
      });
  };
  const selectedVarient1 = (e) => {
    varienrsdata.push(e.value);
    let payload = varienrsdata.join();
    axios
      .get(
        `${baseUrl}/api/modelvarient/getMultipleVarientsByids?ModelVariantName=${payload}`
      )
      .then((res) => {
        setVarientData(res.data.data);
      });
  };
  const selectedBrand2 = (e) => {
    let models = [];
    axios
      .get(
        `${baseUrl}/api/products/getProductBasedOnbrand?products_brand=${e.value}`
      )
      .then((res) => {
        models = res.data.data.map((item) => {
          item["label"] = item["ProductName"];
          item["value"] = item["id"];
          delete item["ProductName"];
          delete item["id"];
          return item;
        });
        setAllmodels2(models);
      });
  };
  const selectedModel2 = (e) => {
    let varients = [];
    let fillVars = [];
    axios
      .get(
        `${baseUrl}/api/products/getVarientsBasedOnProducts?productName=${e.value}`
      )
      .then((res) => {
        varients = res.data.data[0].ModelVariantNameList.map((item) => {
          item["label"] = item["ModelVariantName"];
          item["value"] = item["id"];
          delete item["ModelVariantName"];
          delete item["id"];
          return item;
        });
        varients &&
          varients.forEach((varient, id) => {
            varienrsdata &&
              varienrsdata.map((varIds) => {
                if (varient.value !== varIds) {
                  fillVars.push(varient);
                }
              });
          });
        setAllvarients2(fillVars);
      });
  };
  const selectedVarient2 = (e) => {
    varienrsdata.push(e.value);
    let payload = varienrsdata.join();
    axios
      .get(
        `${baseUrl}/api/modelvarient/getMultipleVarientsByids?ModelVariantName=${payload}`
      )
      .then((res) => {
        setVarientData(res.data.data);
      });
  };
  const selectedBrand3 = (e) => {
    let models = [];
    axios
      .get(
        `${baseUrl}/api/products/getProductBasedOnbrand?products_brand=${e.value}`
      )
      .then((res) => {
        models = res.data.data.map((item) => {
          item["label"] = item["ProductName"];
          item["value"] = item["id"];
          delete item["ProductName"];
          delete item["id"];
          return item;
        });
        setAllmodels3(models);
      });
  };
  const selectedModel3 = (e) => {
    let varients = [];
    let fillVars = [];
    axios
      .get(
        `${baseUrl}/api/products/getVarientsBasedOnProducts?productName=${e.value}`
      )
      .then((res) => {
        varients = res.data.data[0].ModelVariantNameList.map((item) => {
          item["label"] = item["ModelVariantName"];
          item["value"] = item["id"];
          delete item["ModelVariantName"];
          delete item["id"];
          return item;
        });
        varients &&
          varients.forEach((varient, id) => {
           if(varienrsdata?.includes(varient.value)){

           }else {
            fillVars.push(varient);
           }
            // varienrsdata &&
            //   varienrsdata.map((varIds) => {
            //     console.log("hhh",varient.value,varIds)
            //     if (varient.value !== varIds) {
            //       console.log("hiiii")
            //       fillVars.push(varient);
            //     }
            //   });
          });
        setAllvarients3(fillVars);
      });
  };
  const selectedVarient3 = (e) => {
    varienrsdata.push(e.value);
    let payload = varienrsdata.join();
    axios
      .get(
        `${baseUrl}/api/modelvarient/getMultipleVarientsByids?ModelVariantName=${payload}`
      )
      .then((res) => {
        setVarientData(res.data.data);
        setAllmodels3()
        setAllvarients3()
      });
  };
  const selectedBrand4 = (e) => {
    setAllmodels4();
    let models = [];
    axios
      .get(
        `${baseUrl}/api/products/getProductBasedOnbrand?products_brand=${e?.value}`
      )
      .then((res) => {
        models = res.data.data.map((item) => {
          item["label"] = item["ProductName"];
          item["value"] = item["id"];
          delete item["ProductName"];
          delete item["id"];
          return item;
        });
        setAllmodels4(models);
      });
  };
  const selectedModel4 = (e) => {
    setAllvarients4();
    let varients = [];
    let fillVars = [];
    axios
      .get(
        `${baseUrl}/api/products/getVarientsBasedOnProducts?productName=${e.value}`
      )
      .then((res) => {
        varients = res.data.data[0].ModelVariantNameList.map((item) => {
          item["label"] = item["ModelVariantName"];
          item["value"] = item["id"];
          delete item["ModelVariantName"];
          delete item["id"];
          return item;
        });
        varients &&
          varients.forEach((varient, id) => {
            if(varienrsdata?.includes(varient.value)){

            }else {
             fillVars.push(varient);
            }
          });
        setAllvarients4(fillVars);
      });
  };
  const selectedVarient4 = (e) => {
    varienrsdata.push(e.value);
    let payload = varienrsdata.join();
    axios
      .get(
        `${baseUrl}/api/modelvarient/getMultipleVarientsByids?ModelVariantName=${payload}`
      )
      .then((res) => {
        setVarientData(res.data.data);
        setAllmodels4()
        setAllvarients4()
      });
  };
  let varienrsdata = [];
  varientsData &&
    varientsData.map((item) => {
      varienrsdata.push(item?.id);
    });
  const removeProduct = (item, index) => {
    if (index == 0) {
      setAllmodels1();
      setAllvarients1();
      setAllmodels2();
      setAllvarients2();
    }
    if (index == 1) {
      setAllmodels2();
      setAllvarients2();
      setAllmodels3();
      setAllvarients3();
    }
    if (index == 2) {
      setAllmodels3();
      setAllvarients3();
      setAllmodels4();
      setAllvarients4();
    }
    if (index == 3) {
      setAllmodels4();
      setAllvarients4();
    }
    varientsData.forEach((data, id) => {
      if (id == index) {
        return;
      } else {
        filarray.push(data);
      }
    });
    setVarientData(filarray);
  };
  let enginedata = {
    configuration: [],
    brandname: [],
    Camtype: [],
    MaxPower: [],
    maxtorque: [],
  };
  let safetydata = {
    Reardiscbrakes: [],
    Electronicstability: [],
    Vehiclestability: [],
    Rearparkingsensors: [],
    ECM: [],
    Height: [],
    Frontfoglamps: [],
    Reartimer: [],
    Puddlelamps: [],
    Driverrear: [],
    Automaticheadlamp: [],
    Burglaralarm: [],
    AirbagsDriver_Passenger: [],
    AirbagsSide_Curtains: [],
    ABS_with_EBD: [],
    Day_night_mirror: [],
    Front_seat_belts_with_pretensioner: [],
  };
  useEffect(() => {
    varientsData &&
      varientsData.forEach((data, id) => {
        enginedata?.brandname?.push(data?.productList[0].BrandName);
        data?.KeySpecifications.forEach((item) => {
          if (item.title == "Engine") {
            enginedata["title"] = item.title;
            let config = item.context.find(
              (element) => element.key == "Configuration"
            );
            let cam = item.context.find(
              (element) => element.key == "Cam type "
            );
            let max = item.context.find(
              (element) => element.key == "Max Power"
            );
            let torque = item.context.find(
              (element) => element.key == "Max Torque "
            );
            enginedata.configuration.push(config);
            enginedata.Camtype.push(cam);
            enginedata.MaxPower.push(max);
            enginedata.maxtorque.push(torque);
          }
          // const specifications = (spec, titleKey, contextKey) => {
          //     var temp = spec.find(element => element.title == titleKey);
          //     var obj = temp.context.find(element => element.key == contextKey)
          //     return obj.value || "-"
          // }
          if (item.title == "Safety") {
            safetydata["title"] = item.title;
            let Reardisc = item.context.find(
              (element) => element.key == "Rear disc brakes"
            ).value;
            let electronics = item.context.find(
              (element) => element.key == "Electronic stability control (ESC)"
            );
            let vsm = item.context.find(
              (element) =>
                element.key == "Vehicle stability management control (VSM)"
            );
            let rps = item.context.find(
              (element) => element.key == "Rear parking sensors"
            );
            let ecm = item.context.find(
              (element) => element.key == "Electro chromic mirror (ECM)"
            );
            let hafs = item.context.find(
              (element) => element.key == "Height adjustable front seatbelts"
            );
            let ffl = item.context.find(
              (element) => element.key == "Front fog lamps"
            );
            let rdt = item.context.find(
              (element) => element.key == "Rear defogger with timer"
            );
            let plf = item.context.find(
              (element) => element.key == "Puddle lamps with welcome function"
            );
            let drvm = item.context.find(
              (element) => element.key == "Driver rear view monitor"
            );
            let ah = item.context.find(
              (element) => element.key == "Automatic headlamp"
            );
            let ba = item.context.find(
              (element) => element.key == "Burglar alarm"
            );
            let adp = item.context.find(
              (element) => element.key == "Airbags Driver&Passenger"
            );
            let asc = item.context.find(
              (element) => element.key == "Airbags Side&Curtains"
            );
            let abs = item.context.find(
              (element) => element.key == "ABS with EBD "
            );
            let dnirvm = item.context.find(
              (element) => element.key == "Day/night inside rear view mirror"
            );
            let fsbp = item.context.find(
              (element) => element.key == "Front seat belts with pretensioner"
            );
            safetydata.Reardiscbrakes.push(Reardisc);
            safetydata.Electronicstability.push(electronics);
            safetydata.Vehiclestability.push(vsm);
            safetydata.Rearparkingsensors.push(rps);
            safetydata.ECM.push(ecm);
            safetydata.Height.push(hafs);
            safetydata.Frontfoglamps.push(ffl);
            safetydata.Puddlelamps.push(plf);
            safetydata.Driverrear.push(drvm);
            safetydata.Automaticheadlamp.push(ah);
            safetydata.Burglaralarm.push(ba);
            safetydata.AirbagsDriver_Passenger.push(adp);
            safetydata.AirbagsSide_Curtains.push(asc);
            safetydata.ABS_with_EBD.push(abs);
            safetydata.Day_night_mirror.push(dnirvm);
            safetydata.Front_seat_belts_with_pretensioner.push(fsbp);
          }
        });
      });
    setConfigdata(enginedata);
    setSaftydata(safetydata);
  }, [varientsData]);
  return (
    <>
      <Head>
        <title>Nayagadi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Nayagadi_Icon.png" />
      </Head>
      <Container className="py-3">
        <div className="bg-white p-3 sticky-card">
          <h6> Compare Your Feautred Vehicles </h6>
          <Row className="mt-3 m-0 py-3 row-cols-lg-5 row-cols-md-2 bg-ash ">
            <Col className="p-0 d-none d-sm-block d-lg-block comapge-car-add">
              <img src="../comapre-car.svg" />
              <Card className="rounded-0">
                {/* <CardFooter className="bg-white border-0">
                                    <FormGroup
                                        check
                                        inline
                                    >
                                        <Input type="checkbox" />
                                        <Label check className="fs-13">
                                            Hide Common Features
                                        </Label>
                                    </FormGroup>
                                    <FormGroup
                                        check
                                        inline
                                    >
                                        <Input type="checkbox" />
                                        <Label check className="fs-13">
                                            Some other input
                                        </Label>
                                    </FormGroup>
                                </CardFooter> */}
              </Card>
            </Col>

            {/* <Col>
                        <Card className="rounded-0">
                            <CardHeader className="border-0 bg-white p-0">
                                <Image src="./cross_icon.svg" className="float-end" height={16} />
                            </CardHeader>
                            <CardBody>
                                <Image src="./car3.png" style={{ width: "-webkit-fill-available" }} />
                                <p>Maruti Grand VITARA</p>
                                <p>Rs.15.39 Lakh EMI - Rs. 38,500 </p>

                                <Multiselect options={options} showArrow={true} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="rounded-pill" />
                            </CardBody>
                        </Card>

                    </Col>

                    <Col>
                        <Card className="rounded-0">
                            <CardHeader className="border-0 bg-white p-0">
                                <Image src="./cross_icon.svg" className="float-end" height={16} />
                            </CardHeader>
                            <CardBody>
                                <Image src="./car3.png" style={{ width: "-webkit-fill-available" }} />
                                <p>Maruti Grand VITARA</p>
                                <p>Rs.15.39 Lakh EMI - Rs. 38,500 </p>

                                <Multiselect options={options} showArrow={true} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="rounded-pill" />
                            </CardBody>
                        </Card>

                    </Col> */}

            <Col className="text-center col-12">
              <Card className="rounded-0">
                <CardBody>
                  {varientsData?.[0] ? (
                    <div>
                      <div className="rounded-0 compare-text">
                        <div className="border-0 bg-white p-0">
                          <BiX
                            className="float-end compare-close"
                            onClick={() => removeProduct(varientsData?.[0], 0)}
                          />
                          {/* <img src="./cross_icon.svg" className="float-end" height={16} onClick = {() => removeProduct(varientsData?.[0])}/> */}
                        </div>
                        <div>
                          <img
                            className="compare-img"
                            src={varientsData?.[0]?.Images?.images[0]}
                            style={{ width: "-webkit-fill-available" }}
                          />
                          <p className="car-heading">
                            {varientsData?.[0]?.productList?.[0]?.BrandName}{" "}
                            </p>
                            <p className="car-heading-variant">
                            {varientsData?.[0]?.ModelVariantName}
                          </p>
                          <p className="car-price">
                            ₹ {numInLakh(varientsData?.[0]?.Price)}
                            <span>*Ex-showroom Price</span>
                          </p>

                          {/* <Multiselect options={options} showArrow={true} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="rounded-pill" /> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <BiPlus className="compare-plus mb-1" />
                      {/* <Tabs
                                        defaultActiveKey="Brand"
                                        id="justify-tab-example"
                                        className="mb-3"
                                        justify
                                    >
                                        <Tab eventKey="Brand" title="Brand">
                                            <Multiselect options={allbrands} showArrow={true} placeholder={"Select Brand"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="BrandName" className="mt-2" onSelect={selectedBrand} />
                                        </Tab>
                                        <Tab eventKey="Model" title="Model">
                                            <Multiselect options={allmodels} showArrow={true} placeholder={"Select Model"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="ProductName" className="mt-2" onSelect={selectedModel} />
                                        </Tab>
                                        <Tab eventKey="Varient" title="Varient">
                                            <Multiselect options={allvarients} showArrow={true} placeholder={"Select varient"} avoidHighlightFirstOption='true' singleSelect={true} displayValue={"ModelVariantName"} className="mt-2" onSelect={selectedVarient} />
                                        </Tab>

                                    </Tabs> */}
                      <Select
                        onChange={selectedBrand1}
                        options={allbrands}
                        placeholder="Select Brand"
                        className="compair-dropdowns"
                      />{" "}
                      {allmodels1 && (
                        <Select
                          onChange={selectedModel1}
                          options={allmodels1}
                          placeholder="Select Model"
                          className="compair-dropdowns"
                        />
                      )}
                      {allvarients1 && (
                        <Select
                          onChange={selectedVarient1}
                          options={allvarients1}
                          placeholder="Select Varient"
                          className="compair-dropdowns"
                        />
                      )}
                    </div>
                  )}

                  {/* <Multiselect options={options} showArrow={true} placeholder={"Select Brand/Model"} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="mt-2"/> */}
                </CardBody>
              </Card>
            </Col>
            <Col className="text-center col-12">
              <Card className="rounded-0">
                <CardBody>
                  {varientsData?.[1] ? (
                    <div>
                      <div className="rounded-0 compare-text">
                        <div className="border-0 bg-white p-0">
                          <BiX
                            className="float-end compare-close"
                            onClick={() => removeProduct(varientsData?.[1], 1)}
                          />
                          {/* <img src="./cross_icon.svg" className="float-end" height={16}  onClick = {() => removeProduct(varientsData?.[1])} /> */}
                        </div>
                        <div>
                          <img
                            className="compare-img"
                            src={varientsData?.[1]?.Images?.images[0]}
                            style={{ width: "-webkit-fill-available" }}
                          />
                          <p className="car-heading">
                            {varientsData?.[1]?.productList?.[0]?.BrandName}{" "}
                            </p>                           
                             <p className="car-heading-variant">
                            {varientsData?.[1]?.ModelVariantName}
                          </p>
                          <p className="car-price">
                            ₹ {numInLakh(varientsData?.[1]?.Price)}
                            <span>*Ex-showroom Price</span>
                          </p>

                          {/* <Multiselect options={options} showArrow={true} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="rounded-pill" /> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <BiPlus className="compare-plus mb-1" />
                      {/* <Tabs

                                        defaultActiveKey="Brand"
                                        id="justify-tab-example"
                                        className="mb-3"
                                        justify
                                    >
                                        <Tab eventKey="Brand" title="Brand">
                                            <Multiselect options={allbrands} showArrow={true} placeholder={"Select Brand"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="BrandName" className="mt-2" onSelect={selectedBrand} />
                                        </Tab>
                                        <Tab eventKey="Model" title="Model">
                                            <Multiselect options={allmodels} showArrow={true} placeholder={"Select Model"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="ProductName" className="mt-2" onSelect={selectedModel} />
                                        </Tab>
                                        <Tab eventKey="Varient" title="Varient">
                                            <Multiselect options={allvarients} showArrow={true} placeholder={"Select varient"} avoidHighlightFirstOption='true' singleSelect={true} displayValue={"ModelVariantName"} className="mt-2" onSelect={selectedVarient} />
                                        </Tab>

                                    </Tabs> */}
                  <Select
                        onChange={selectedBrand2}
                        options={allbrands}
                        placeholder="Select Brand"
                        className="compair-dropdowns"
                      />{" "}
                      {allmodels2 && (
                        <Select
                          onChange={selectedModel2}
                          options={allmodels2}
                          placeholder="Select Model"
                          className="compair-dropdowns"
                        />
                      )}
                      {allvarients2 && (
                        <Select
                          onChange={selectedVarient2}
                          options={allvarients2}
                          placeholder="Select Varient"
                          className="compair-dropdowns"
                        />
                      )}
                    </div>
                  )}

                  {/* <Multiselect options={options} showArrow={true} placeholder={"Select Brand/Model"} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="mt-2"/> */}
                </CardBody>
              </Card>
            </Col>
            <Col className="text-center col-12">
              <Card className="rounded-0">
                <CardBody>
                  {varientsData?.[2] ? (
                    <div>
                      <div className="rounded-0 compare-text">
                        <div className="border-0 bg-white p-0">
                          <BiX
                            className="float-end compare-close"
                            onClick={() => removeProduct(varientsData?.[2], 2)}
                          />
                          {/* <img src="./cross_icon.svg" className="float-end" height={16}  onClick = {() => removeProduct(varientsData?.[2])}/> */}
                        </div>
                        <div>
                          <img
                            className="compare-img"
                            src={varientsData?.[2]?.Images?.images[0]}
                            style={{ width: "-webkit-fill-available" }}
                          />
                          <p className="car-heading">
                            {varientsData?.[2]?.productList?.[0]?.BrandName}{" "}
                            </p>                          
                            <p className="car-heading-variant">
                            {varientsData?.[2]?.ModelVariantName}
                          </p>
                          <p className="car-price">
                            ₹ {numInLakh(varientsData?.[2]?.Price)}
                            <span>*Ex-showroom Price</span>
                          </p>

                          {/* <Multiselect options={options} showArrow={true} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="rounded-pill" /> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <BiPlus className="compare-plus mb-1" />
                      {/* <Tabs
                                        defaultActiveKey="Brand"
                                        id="justify-tab-example"
                                        className="mb-3"
                                        justify
                                    >
                                        <Tab eventKey="Brand" title="Brand">
                                            <Multiselect options={allbrands} showArrow={true} placeholder={"Select Brand"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="BrandName" className="mt-2" onSelect={selectedBrand} />
                                        </Tab>
                                        <Tab eventKey="Model" title="Model">
                                            <Multiselect options={allmodels} showArrow={true} placeholder={"Select Model"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="ProductName" className="mt-2" onSelect={selectedModel} />
                                        </Tab>
                                        <Tab eventKey="Varient" title="Varient">
                                            <Multiselect options={allvarients} showArrow={true} placeholder={"Select varient"} avoidHighlightFirstOption='true' singleSelect={true} displayValue={"ModelVariantName"} className="mt-2" onSelect={selectedVarient} />
                                        </Tab>

                                    </Tabs> */}
                      <Select
                        onChange={selectedBrand3}
                        options={allbrands}
                        className="compair-dropdowns"
                        placeholder="Select Brand"
                      />{" "}
                      {allmodels3 && (
                        <Select
                          onChange={selectedModel3}
                          options={allmodels3}
                          className="compair-dropdowns"
                          placeholder="Select Model"
                        />
                      )}
                      {allvarients3 && (
                        <Select
                          onChange={selectedVarient3}
                          options={allvarients3}
                          className="compair-dropdowns"
                          placeholder="Select Varient"
                        />
                      )}
                    </div>
                  )}

                  {/* <Multiselect options={options} showArrow={true} placeholder={"Select Brand/Model"} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="mt-2"/> */}
                </CardBody>
              </Card>
            </Col>
            <Col className="text-center">
              <Card className="rounded-0">
                <CardBody>
                  {varientsData?.[3] ? (
                    <div>
                      <div className="rounded-0 compare-text">
                        <div className="border-0 bg-white p-0">
                          <BiX
                            className="float-end compare-close"
                            onClick={() => removeProduct(varientsData?.[2], 2)}
                          />
                          {/* <img src="./cross_icon.svg" className="float-end" height={16}  onClick = {() => removeProduct(varientsData?.[2])}/> */}
                        </div>
                        <div>
                          <img
                            className="compare-img"
                            src={varientsData?.[3]?.Images?.images[0]}
                            style={{ width: "-webkit-fill-available" }}
                          />
                          <p className="car-heading">
                            {varientsData?.[3]?.productList?.[0]?.BrandName}{" "}
                            </p>
                            <p className="car-heading-variant">
                            {varientsData?.[3]?.ModelVariantName}
                          </p>
                          <p className="car-price">
                            ₹ {numInLakh(varientsData?.[3]?.Price)}
                            <span>*Ex-showroom Price</span>
                          </p>

                          {/* <Multiselect options={options} showArrow={true} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="rounded-pill" /> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="compare-options">
                      <BiPlus className="compare-plus mb-1" />
                      {/* <Tabs
                                        defaultActiveKey="Brand"
                                        id="justify-tab-example"
                                        className="mb-3"
                                        justify
                                    >
                                        <Tab eventKey="Brand" title="Brand">
                                            <Multiselect options={allbrands} showArrow={true} placeholder={"Select Brand"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="BrandName" className="mt-2" onSelect={selectedBrand} />
                                        </Tab>
                                        <Tab eventKey="Model" title="Model">
                                            <Multiselect options={allmodels} showArrow={true} placeholder={"Select Model"} avoidHighlightFirstOption='true' singleSelect={true} displayValue="ProductName" className="mt-2" onSelect={selectedModel} />
                                        </Tab>
                                        <Tab eventKey="Varient" title="Varient">
                                            <Multiselect options={allvarients} showArrow={true} placeholder={"Select varient"} avoidHighlightFirstOption='true' singleSelect={true} displayValue={"ModelVariantName"} className="mt-2" onSelect={selectedVarient} />
                                        </Tab>

                                    </Tabs> */}
                    <Select
                        onChange={selectedBrand4}
                        options={allbrands}
                        className="compair-dropdowns"
                        placeholder="Select Brand"
                      />{" "}
                      {allmodels4 && (
                        <Select
                          onChange={selectedModel4}
                          options={allmodels4}
                          placeholder="Select Model"
                          className="compair-dropdowns"
                        />
                      )}
                      {allvarients4 && (
                        <Select
                          onChange={selectedVarient4}
                          options={allvarients4}
                          placeholder="Select Varient"
                          className="compair-dropdowns"
                        />
                      )}
                    </div>
                  )}

                  {/* <Multiselect options={options} showArrow={true} placeholder={"Select Brand/Model"} avoidHighlightFirstOption='true' isObject={false} singleSelect={true} className="mt-2"/> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="bg-white mt-1 pl-3">
          <Row className="mt-2 m-0 py-3">
            <h5 className="compare-info"> {configdata?.title} Information</h5>
            <hr />
            <table className="table table-borderless compair-table">
              <thead>
                <tr>
                  <td className="table-side-head">Brand Name</td>
                  {/* <th scope="col" className="red text-center"> {specifications(varientsData?.[0]?.KeySpecifications,"Engine", "Configuration")} </th>  */}
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[0]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[1]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[2]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[3]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-side-head">Configuration</td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[0]?.KeySpecifications,
                      "Engine",
                      "Configuration"
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[1]?.KeySpecifications,
                      "Engine",
                      "Configuration"
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[2]?.KeySpecifications,
                      "Engine",
                      "Configuration"
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[3]?.KeySpecifications,
                      "Engine",
                      "Configuration"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-side-head">Cam type</td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[0]?.KeySpecifications,
                      "Engine",
                      "Cam type "
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[1]?.KeySpecifications,
                      "Engine",
                      "Cam type "
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[2]?.KeySpecifications,
                      "Engine",
                      "Cam type "
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[3]?.KeySpecifications,
                      "Engine",
                      "Cam type "
                    )}
                  </td>
                  {/* <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"} />
                                    Based on <span className="red fw-bold">154 Reviews</span>
                                </td>
                                <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"}/>Based on 
                                    <span className="red fw-bold">154 Reviews</span>
                                </td> */}
                </tr>
                <tr>
                  <td className="table-side-head">MaxPower</td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[0]?.KeySpecifications,
                      "Engine",
                      "Max Power"
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[1]?.KeySpecifications,
                      "Engine",
                      "Max Power"
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[2]?.KeySpecifications,
                      "Engine",
                      "Max Power"
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[3]?.KeySpecifications,
                      "Engine",
                      "Max Power"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-side-head">Maxtorque</td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[0]?.KeySpecifications,
                      "Engine",
                      "Max Torque "
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[1]?.KeySpecifications,
                      "Engine",
                      "Max Torque "
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[2]?.KeySpecifications,
                      "Engine",
                      "Max Torque "
                    )}
                  </td>
                  <td className="text-center">
                    {specifications(
                      varientsData?.[3]?.KeySpecifications,
                      "Engine",
                      "Max Torque "
                    )}
                  </td>
                </tr>
                {/* <tr>
                                <th scope="row">Offers & Discount</th>
                                <td className="text-center">
                                    <img src="./cross_icon.svg" />
                                </td>
                                <td className="text-center">
                                <img src="./cross_icon.svg" fill="#fff" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Finance Available (EMI)</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Insurance</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr> */}
              </tbody>
            </table>
          </Row>
        </div>
        <div className="bg-white mt-1 pl-3">
          <Row className="mt-2 m-0 py-3">
            <h5 className="compare-info">Safety</h5>
            <hr />
            <table className="table table-borderless compair-table">
              <thead>
                <tr>
                  <td className="table-side-head">Brand Name</td>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[0]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[1]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[2]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[3]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-side-head">Rear disc brakes</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Rear disc brakes"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Rear disc brakes"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Rear disc brakes"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Rear disc brakes"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Electronic stability control (ESC)
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Electronic stability control (ESC)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Electronic stability control (ESC)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Electronic stability control (ESC)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Electronic stability control (ESC)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {/* <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"} />
                                    Based on <span className="red fw-bold">154 Reviews</span>
                                </td>
                                <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"}/>Based on 
                                    <span className="red fw-bold">154 Reviews</span>
                                </td> */}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Vehicle stability management control (VSM)
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Vehicle stability management control (VSM)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Vehicle stability management control (VSM)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Vehicle stability management control (VSM)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Vehicle stability management control (VSM)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">Driver rear view monitor</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Driver rear view monitor"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Driver rear view monitor"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Driver rear view monitor"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Driver rear view monitor"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">Automatic headlamp</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Automatic headlamp"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Automatic headlamp"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Automatic headlamp"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Automatic headlamp"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">Burglar alarm</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Burglar alarm"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Burglar alarm"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Burglar alarm"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Burglar alarm"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">Airbags Driver&Passenger</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Airbags Driver&Passenger"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Airbags Driver&Passenger"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Airbags Driver&Passenger"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Airbags Driver&Passenger"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">Airbags Side&Curtains</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Airbags Side&Curtains"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Airbags Side&Curtains"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Airbags Side&Curtains"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Airbags Side&Curtains"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">ABS with EBD</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "ABS with EBD "
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "ABS with EBD "
                      ) == "no" ? (
                        <BiX />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "ABS with EBD "
                      ) == "no" ? (
                        <BiX />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "ABS with EBD "
                      ) == "no" ? (
                        <BiX />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Day/night inside rear view mirror
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Day/night inside rear view mirror"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Day/night inside rear view mirror"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Day/night inside rear view mirror"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Day/night inside rear view mirror"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Front seat belts with pretensioner
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Front seat belts with pretensioner"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Front seat belts with pretensioner"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Front seat belts with pretensioner"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Front seat belts with pretensioner"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Driver & passenger seatbelt reminder
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Safety",
                        "Driver & passenger seatbelt reminder"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Safety",
                        "Driver & passenger seatbelt reminder"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Safety",
                        "Driver & passenger seatbelt reminder"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Safety",
                        "Driver & passenger seatbelt reminder"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                {/* <tr>
                                <th scope="row">Offers & Discount</th>
                                <td className="text-center">
                                    <img src="./cross_icon.svg" />
                                </td>
                                <td className="text-center">
                                <img src="./cross_icon.svg" fill="#fff" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Finance Available (EMI)</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Insurance</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr> */}
              </tbody>
            </table>
          </Row>
        </div>
        <div className="bg-white mt-1 pl-3">
          <Row className="mt-2 m-0 py-3">
            <h5 className="compare-info">Exteriors</h5>
            <hr />
            <table className="table table-borderless compair-table">
              <thead>
                <tr>
                  <td className="table-side-head">Brand Name</td>
                  {/* <th scope="col" className="red text-center"> {specifications(varientsData?.[0]?.KeySpecifications,"Engine", "Configuration")} </th>  */}
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[0]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[1]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[2]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[3]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-side-head">
                    A-pillar piano black glossy finish
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Exteriors",
                        "A-pillar piano black glossy finish"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Exteriors",
                        "A-pillar piano black glossy finish"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Exteriors",
                        "A-pillar piano black glossy finish"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Exteriors",
                        "A-pillar piano black glossy finish"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">B-pillar black-out tape^</td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Exteriors",
                        "B-pillar black-out tape^"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Exteriors",
                        "B-pillar black-out tape^"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Exteriors",
                        "B-pillar black-out tape^"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Exteriors",
                        "B-pillar black-out tape^"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {/* <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"} />
                                    Based on <span className="red fw-bold">154 Reviews</span>
                                </td>
                                <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"}/>Based on 
                                    <span className="red fw-bold">154 Reviews</span>
                                </td> */}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Lightening arch-C-pillar-Silver
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Silver"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Silver"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Silver"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Silver"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Lightening arch-C-pillar-Black gloss
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Black gloss"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Black gloss"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Black gloss"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Exteriors",
                        "Lightening arch-C-pillar-Black gloss"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                {/* <tr>
                                <th scope="row">Offers & Discount</th>
                                <td className="text-center">
                                    <img src="./cross_icon.svg" />
                                </td>
                                <td className="text-center">
                                <img src="./cross_icon.svg" fill="#fff" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Finance Available (EMI)</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Insurance</th>
                                <td className="text-center">Rs.31,125 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                                <td className="text-center">Rs.42,448 <br/>
                                    <Link href="#" className="ash small">Check Now</Link>
                                </td>
                            </tr> */}
              </tbody>
            </table>
          </Row>
        </div>
        <div className="bg-white mt-1 pl-3">
          <Row className="mt-2 m-0 py-3">
            <h5 className="compare-info">Interior</h5>
            <hr />
            <table className="table table-borderless compair-table">
              <thead>
                <tr>
                  <td className="table-side-head">Brand Name</td>
                  {/* <th scope="col" className="red text-center"> {specifications(varientsData?.[0]?.KeySpecifications,"Engine", "Configuration")} </th>  */}
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[0]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[1]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[2]}
                  </th>
                  <th scope="col" className="red text-center">
                    {configdata?.brandname?.[3]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-side-head">
                    Two tone black & greige interiors
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Interior",
                        "Two tone black & greige interiors"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Interior",
                        "Two tone black & greige interiors"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Interior",
                        "Two tone black & greige interiors"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Interior",
                        "Two tone black & greige interiors"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    All-black interiors with coloured inserts
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Interior",
                        "All-black interiors with coloured inserts"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Interior",
                        "All-black interiors with coloured inserts"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Interior",
                        "All-black interiors with coloured inserts"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Interior",
                        "All-black interiors with coloured inserts"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {/* <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"} />
                                    Based on <span className="red fw-bold">154 Reviews</span>
                                </td>
                                <td className="text-center">
                                    <ReactStars count={5} size={24} color2={'#D01818'} value={3} className={"star_class"}/>Based on 
                                    <span className="red fw-bold">154 Reviews</span>
                                </td> */}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Soothing blue ambient lighting
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Interior",
                        "Soothing blue ambient lighting"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Interior",
                        "Soothing blue ambient lighting"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Interior",
                        "Soothing blue ambient lighting"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Interior",
                        "Soothing blue ambient lighting"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="table-side-head">
                    Inside door handles (metal finish)
                  </td>
                  {varientsData?.[0]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[0]?.KeySpecifications,
                        "Interior",
                        "Inside door handles (metal finish)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[1]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[1]?.KeySpecifications,
                        "Interior",
                        "Inside door handles (metal finish)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[2]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[2]?.KeySpecifications,
                        "Interior",
                        "Inside door handles (metal finish)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                  {varientsData?.[3]?.KeySpecifications && (
                    <td className="text-center">
                      {specifications(
                        varientsData?.[3]?.KeySpecifications,
                        "Interior",
                        "Inside door handles (metal finish)"
                      ) == "no" ? (
                        <BiX className="text-danger" />
                      ) : (
                        <BiCheck className="text-success" />
                      )}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default CompareCard;
