import React, {Component, useContext, useState, useEffect, useRef} from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import CurriculumApi from "../../api/CurriculumApi";

class AddressInput {

    static ProvincesAll(props) {
        const { onChange, value, required } = props;
        {
            /------- ###### get Provinces ######  ---------/
        }

        const [provinces, setProvinces] = useState([]);
        const [districts, setDistricts] = useState([]);
        const [subDistricts, setSubDistricts] = useState([]);

        useEffect(() => {
            getProvinces();
        }, []);

        function getProvinces() {
            axios.get('/open-api/getAllProvinces')
                .then(response => {
                    setProvinces(response.data)
                })
                .catch(error => console.log(error));
        }

        function getDistrict(pid) {
            axios.get('/open-api/getDistrict/' + pid)
                .then(response => {
                    setDistricts(response.data)
                })
                .catch(error => console.log(error));
        }

        function getCanton(did) {
            axios.get('/open-api/getCanton/' + did)
                .then(response => {
                    setSubDistricts(response.data)
                })
                .catch(error => console.log(error));
        }

        {
            /------- ###### End get Provinces ######  ---------/
        }


        const [selectedProvince, setSelectedProvince] = useState("");
        const [selectedDistrict, setSelectedDistrict] = useState("");
        const [selectedCanton, setSelectedCanton] = useState("");

        const handleProvinceChange = (provinceId , provinceName ) => {
            setSelectedProvince(provinceId);
            getDistrict(provinceId);
            onChange({ province: provinceName }); // ส่งค่า province กลับไปยัง ServyComponent
        };

        const handleDistrictChange = (districtId , districtName ) => {
            setSelectedDistrict(districtId);
            getCanton(districtId);
            onChange({ ...value, district: districtName }); // ส่งค่า district กลับไปยัง ServyComponent
        };

        const handleCantonChange = (cantonName ) => {
            onChange({ ...value, canton: cantonName }); // ส่งค่า canton กลับไปยัง ServyComponent
        };

        return (
            <div>
                <Autocomplete
                    fullWidth
                    size="small"
                    value={value.province}
                    onChange={async (event, newValue) => {
                        handleProvinceChange(newValue.id , newValue.label )
                    }}
                    options={provinces.map((provinces) => {
                        return {
                            label: provinces.name,
                            id: provinces.id
                        }
                    })}
                    renderInput={
                        (params) =>
                            <TextField
                                {...params}
                                label="จังหวัด" variant="outlined" name="province"
                                required={Boolean(required)}
                            />
                    }
                />

                <br/>
                {value.province && (
                    <Autocomplete
                        fullWidth
                        size="small"
                        value={value.district}
                        onChange={async (event, newValue) => {
                            handleDistrictChange(newValue.id , newValue.label  )
                        }}
                        options={districts.map((districts) => {
                            return {
                                label: districts.name,
                                id: districts.id
                            }
                        })}
                        renderInput={(params) => (
                            <TextField {...params} label="เขต/อำเภอ" variant="outlined" name="district" required={Boolean(required)} />
                        )}
                    />

                )}
                <br/>
                {value.district && (
                    <Autocomplete
                        fullWidth
                        size="small"
                        options={subDistricts.map((subDistricts) => {
                            return {
                                label: subDistricts.name,
                                id: subDistricts.id
                            }
                        })}
                        // value={subDistricts.name}
                        value={value.canton}
                        onChange={async (event, newValue) => {
                            handleCantonChange(newValue.label )
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="แขวง/ตำบล" variant="outlined" name="canton" required={Boolean(required)} />
                        )}
                    />
                )}
            </div>
        )
    }

    static ProvincesDistricts(props) {

        const { onChange, value, required } = props;

        const [provinces, setProvinces] = useState([]);
        const [districts, setDistricts] = useState([]);

        // useEffect(() => {
        //     getProvinces();
        //     console.log('dddd');
        // }, []);

        useEffect(() => {
            getProvinces();
            console.log('dddd');
          }, [props]);

        function getProvinces() {
            axios.get('/open-api/getAllProvinces')
                .then(response => {
                    setProvinces(response.data)
                })
                .catch(error => console.log(error));
        }

        function getDistrict(pid) {
            axios.get('/open-api/getDistrict/' + pid)
                .then(response => {
                    setDistricts(response.data)
                })
                .catch(error => console.log(error));
        }

        const [selectedProvince, setSelectedProvince] = useState("");

        const handleProvinceChange = (provinceId , provinceName ) => {
            setSelectedProvince(provinceId);
            getDistrict(provinceId);
            onChange({ province: provinceName }); // ส่งค่า province กลับไปยัง ServyComponent
        };

        const handleDistrictChange = (districtName) => {
            onChange({ ...value, district: districtName }); // ส่งค่า district กลับไปยัง ServyComponent
        };

        return (
            <>

                <Autocomplete
                    fullWidth
                    size="small"
                    value={value.province}
                    onChange={async (event, newValue) => {
                        handleProvinceChange(newValue.id , newValue.label )
                    }}
                    options={provinces.map((provinces) => {
                        return {
                            label: provinces.name,
                            id: provinces.id
                        }
                    })}
                    renderInput={
                        (params) =>
                            <TextField
                                {...params}
                                label="จังหวัด" variant="outlined" name="province"
                                required={Boolean(required)}
                            />
                    }
                />

                <br />
                {value.province && (
                    <Autocomplete
                        fullWidth
                        size="small"
                        value={value.district}
                        onChange={async (event, newValue) => {
                            handleDistrictChange(newValue.label )
                        }}
                        options={districts.map((districts) => {
                            return {
                                label: districts.name,
                                id: districts.id
                            }
                        })}
                        renderInput={(params) => (
                            <TextField {...params} label="เขต/อำเภอ" variant="outlined" name="district" required={Boolean(required)} />
                        )}
                    />

                )}

            </>
        )
    }

    static Provinces({ onChange, value, required }) {

        const [provinces, setProvinces] = useState([]);

        useEffect(() => {
            getProvinces();
        }, []);

        function getProvinces() {
            axios.get('/open-api/getAllProvinces')
                .then(response => {
                    setProvinces(response.data)
                })
                .catch(error => console.log(error));
        }

        const handleProvinceChange = (provinceName ) => {
            onChange({ province: provinceName }); // ส่งค่า province กลับไปยัง ServyComponent
        };

        return (
            <>
                <Autocomplete
                    fullWidth
                    size="small"
                    // value={provinces.find(p => p.id === value.province)}
                    value={value.province}
                    onChange={async (event, newValue) => {
                        handleProvinceChange(newValue.label )
                    }}
                    options={provinces.map((provinces) => {
                        return {
                            label: provinces.name,
                            id: provinces.id
                        }
                    })}
                    renderInput={
                        (params) =>
                            <TextField
                                {...params}
                                label="จังหวัด" variant="outlined" name="province"
                                required={Boolean(required)}
                            />
                    }
                />


            </>
        )
    }
}
export default AddressInput

