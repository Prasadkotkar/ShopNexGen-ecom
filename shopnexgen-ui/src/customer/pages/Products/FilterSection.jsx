import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { indigo } from "@mui/material/colors";
import { brands } from "../../../data/Filter/brand";
import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [expendBrand, setExpendBrand] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpendBrand = () => {
    setExpendBrand(!expendBrand);
  };

  const handleExpendColor = () => {
    setExpendColor(!expendColor);
  };

  const updateFilterParams = (e) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    searchParams.forEach((value, key) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button onClick={clearAllFilters} size="small" className="text-indigo-600 cursor-pointer font-semibold">
          clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: indigo[600],
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup
              onChange={updateFilterParams}
              aria-labelledby="color"
              defaultValue=""
              name="color"
            >
              {colors
                .slice(0, expendColor ? colors.length : 5)
                .map((item) => (
                  <FormControlLabel
                    sx={{ fontSize: "12px" }}
                    key={item.name}
                    value={item.name}
                    control={<Radio size="small" />}
                    label={
                      <div className="flex items-center gap-3">
                        <p>{item.name}</p>
                        <span
                          style={{ backgroundColor: item.hex }}
                          className={`h-5 w-5 rounded-full border`}
                        ></span>
                      </div>
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleExpendColor}
              className="text-indigo-600 cursor-pointer hover:text-indigo-900 flex items-center"
            >
              {expendColor ? "hide" : `+ ${colors.length - 5} more`}
            </button>
          </div>
        </section>
        <Divider />

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: indigo[600],
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              aria-labelledby="price"
              defaultValue=""
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: indigo[600],
              }}
              className="text-2xl font-semibold"
              id="brand"
            >
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              aria-labelledby="brand"
              defaultValue=""
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
