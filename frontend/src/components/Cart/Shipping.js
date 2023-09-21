import React, {Fragment, useState} from 'react';
import "./Shipping.css";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingInfo} from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from '@material-ui/icons/PinDrop';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { toast } from 'react-hot-toast';
import { Country, State} from 'country-state-city';
import CheckoutSteps from './CheckoutSteps.js';

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {shippingInfo} = useSelector(state => state.cart);
    const [address, setAddress] = useState(shippingInfo?.address||'');
    const [city, setCity] = useState(shippingInfo?.city||'');
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode||'');
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo||'');
    const [country, setCountry] = useState(shippingInfo?.country||'');
    const [state, setState] = useState(shippingInfo?.state||'');
    
     const shippingSubmit = (e) => {
        e.preventDefault();
        if(phoneNo.length !== 10){
            toast.error("Invalid Phone Number");
            return;
        }
        dispatch(saveShippingInfo({address, city, pinCode, phoneNo, country, state}));
        navigate("/order/confirm");
        toast.success("Shipping Info Saved");
    }


  return (
    <Fragment>
        <MetaData title="Shipping Info" />
        <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Info</h2>
                <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
                    <div>
                        <HomeIcon />
                        <input 
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <LocationCityIcon />
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <PinDropIcon />
                        <input
                            type="number"
                            placeholder="Zip Code"
                            name="zip code"
                            value={pinCode}
                            required
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <PhoneIcon />
                        <input
                            type="number"
                            placeholder="Phone Number"
                            name="phone number"
                            value={phoneNo}
                            required
                            onChange={(e) => setPhoneNo(e.target.value)}
                            size="10"
                        />
                    </div>
                    <div>
                        <PublicIcon />
                        <select
                            required
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value=""> Country</option>
                            {Country && Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                   {country && (
                        <div>
                            <TransferWithinAStationIcon />
                            <select
                                required
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value=""> State</option>
                                {State && State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                   )}
                    <button type="submit" className="shippingBtn" disabled={state? false: true}>Continue</button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping;
