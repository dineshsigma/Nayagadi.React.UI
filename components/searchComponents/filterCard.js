import Multiselect from "multiselect-react-dropdown";
import { Col, Row } from "reactstrap";
import InputRange from 'react-input-range';
import { useState, memo, useEffect } from "react";
import { useRouter } from 'next/router'

function FilterCard({ className, brandData, modalData, fuelData, carData, onApplyFilters }) {

    let [brandsSelected, setBrandsSelected] = useState([]);
    let [modalsSelected, setModalsSelected] = useState([]);
    let [fuelSelected, setFuelSelected] = useState([]);
    let [carsSelected, setCarsSelected] = useState([]);
    let [minValue, setMinValue] = useState(0);
    let [maxValue, setMaxValue] = useState(0);
    const [range, setRange] = useState({
        min: minValue,
        max: maxValue,
    })

    let navigate;
    // navigate = useRouter().query?.slug ? useRouter().query?.slug[0] : null;

    useEffect(() => {
        if (navigate) {
            if (navigate !== null && navigate?.includes('&')) {
                let arr = navigate.split('&')

                arr.forEach(q => {
                    let x = q.split('=');

                    if (x[1].includes(',')) {
                        switch (x[0]) {
                            case 'brandSelected':
                                setBrandsSelected(x[1].split(','))
                            case 'carsSelected':
                                setCarsSelected(x[1].split(','))
                            case 'modalsSelected':
                                setModalsSelected(x[1].split(','))
                            case 'fuelSelected':
                                setFuelSelected(x[1].split(','))
                        }
                    } else if (x[1] != '') {
                        switch (x[0]) {
                            case 'brandSelected':
                                setBrandsSelected([x[1]])
                            case 'carsSelected':
                                setCarsSelected([x[1]])
                            case 'modalsSelected':
                                setModalsSelected([x[1]])
                            case 'fuelSelected':
                                setFuelSelected([x[1]])
                            case 'min':
                                setMinValue(parseInt(x[1]))
                                setRange({ min: parseInt(x[1]), max: maxValue })
                            case 'max':
                                setMaxValue(parseInt(x[1]))
                                setRange({ min: minValue, max: parseInt(x[1]) })
                        }
                    } else {
                        switch (x[0]) {
                            case 'brandSelected':
                                setBrandsSelected([])
                            case 'carsSelected':
                                setCarsSelected([])
                            case 'modalsSelected':
                                setModalsSelected([])
                            case 'fuelSelected':
                                setFuelSelected([])
                            case 'min':
                                setMinValue('')
                                setRange({ min: 0, max: maxValue })
                            case 'max':
                                setMaxValue('')
                                setRange({ min: minValue, max: 0 })
                        }
                    }
                })
            }
        }
    }, [])


    let brands = []
    brandData?.forEach(element => {
        brands.push(element.attributes.BrandName)
    });

    let modals = []
    modalData?.forEach(element => {
        modals.push(element.attributes.ModelName)
    });

    let fuelTypes = []
    fuelData?.forEach(element => {
        fuelTypes.push(element.attributes.FuelType)
    });

    let cars = []
    carData?.forEach(element => {
        cars.push(element.attributes.CarType)
    });

    let list1 = brandData.data

    const onSelectBrand = (selectedList, selectedItem) => {
        setBrandsSelected(selectedList)
        onApplyFilters(selectedList, carsSelected, modalsSelected, fuelSelected, minValue, maxValue)
    }

    const onSelectModal = (selectedList, selectedItem) => {
        setModalsSelected(selectedList)
        onApplyFilters(brandsSelected, carsSelected, selectedList, fuelSelected, minValue, maxValue)
    }

    const onSelectFuel = (selectedList, selectedItem) => {
        setFuelSelected(selectedList)
        onApplyFilters(brandsSelected, carsSelected, modalsSelected, selectedList, minValue, maxValue)
    }

    const onSelectCar = (selectedList, selectedItem) => {
        setCarsSelected(selectedList)
        onApplyFilters(brandsSelected, selectedList, modalsSelected, fuelSelected, minValue, maxValue)
    }

    const onRangeChange = (e) => {
        setRange(e)
        setMinValue(e.min)
        setMaxValue(e.max)
        onApplyFilters(brandsSelected, carsSelected, modalsSelected, fuelSelected, e.min, e.max)
    }

    const onMinChange = (e) => {
        setMinValue(e.target.value)
        setRange({
            min: e.target.value,
            max: maxValue
        })
        onApplyFilters(brandsSelected, carsSelected, modalsSelected, fuelSelected, e.target.value, maxValue)
    }

    const onMaxChange = (e) => {
        setMaxValue(e.target.value)
        setRange({
            min: minValue,
            max: e.target.value
        })
        onApplyFilters(brandsSelected, carsSelected, modalsSelected, fuelSelected, minValue, e.target.value)
    }


    return (
        <Row className={`white-bg p-4 ${className}`} id="filter-card">
            <h5>Search Filters</h5>
            <Multiselect options={brands} selectedValues={brandsSelected} onSelect={onSelectBrand} onRemove={onSelectBrand}
                showArrow={true} customArrow={true} placeholder="Select Brand" className="mt-3" avoidHighlightFirstOption='true' isObject={false} hidePlaceholder={true} />
            <Multiselect options={modals} selectedValues={modalsSelected} showArrow={true} onSelect={onSelectModal} onRemove={onSelectModal} customArrow={true} placeholder="Select Model" className="mt-3" avoidHighlightFirstOption='true' isObject={false} hidePlaceholder={true} />
            <Multiselect options={cars} selectedValues={carsSelected} showArrow={true} onSelect={onSelectCar} onRemove={onSelectCar} customArrow={true} placeholder="Vehicle Type" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" isObject={false} hidePlaceholder={true} />
            <Multiselect options={list1} showArrow={true} customArrow={true} placeholder="Condition" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            <Col lg={6}>
                <Multiselect options={list1} showArrow={true} customArrow={true} placeholder="From" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            </Col>
            <Col lg={6}>
                <Multiselect options={list1} showArrow={true} customArrow={true} placeholder="To" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />
            </Col>
            <Multiselect options={list1} showArrow={true} customArrow={true} placeholder="Transmission" className="mt-3" avoidHighlightFirstOption='true' displayValue="name" />

            <Multiselect options={fuelTypes} selectedValues={fuelSelected} showArrow={true} onSelect={onSelectFuel} onRemove={onSelectFuel} customArrow={true} placeholder="Fuel Type" singleSelect={true} className="mt-3" avoidHighlightFirstOption='true' isObject={false} hidePlaceholder={true} />

            <div className="mt-4 mb-2">
                <h6 className="mb-3">Filter By Price</h6>
                <InputRange minValue={1000} maxValue={5000000} onChange={onRangeChange} value={range} />
                <Row className="mt-3">
                    <Col xs={6}>
                        <input className="form-control rounded-0" value={minValue} onChange={(e) => onMinChange(e)} type={'number'} />
                    </Col>
                    <Col xs={6}>
                        <input className="form-control rounded-0 " type={'number'} value={maxValue} onChange={onMaxChange} />
                    </Col>
                </Row>
            </div>

            <div className="d-grid gap-2 col mx-auto mt-4">
                <button className="btn btn-submit" type="button" onClick={() => onApplyFilters(brandsSelected, carsSelected, modalsSelected, fuelSelected, minValue, maxValue)}>Apply Filters</button>
            </div>
        </Row>
    )
}

export default memo(FilterCard);