import React from "react";
import { Grid, TextField } from "@mui/material";

const BecomeSellerFormStep2 = ({ formik }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.name && Boolean(formik.errors.pickupAddress?.name)}
            helperText={formik.touched.pickupAddress?.name && formik.errors.pickupAddress?.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.mobile && Boolean(formik.errors.pickupAddress?.mobile)}
            helperText={formik.touched.pickupAddress?.mobile && formik.errors.pickupAddress?.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="pickupAddress.pincode"
            label="Pincode"
            value={formik.values.pickupAddress.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.pincode && Boolean(formik.errors.pickupAddress?.pincode)}
            helperText={formik.touched.pickupAddress?.pincode && formik.errors.pickupAddress?.pincode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Address (House No, Building, Street)"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.address && Boolean(formik.errors.pickupAddress?.address)}
            helperText={formik.touched.pickupAddress?.address && formik.errors.pickupAddress?.address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality/Town"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.locality && Boolean(formik.errors.pickupAddress?.locality)}
            helperText={formik.touched.pickupAddress?.locality && formik.errors.pickupAddress?.locality}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.city && Boolean(formik.errors.pickupAddress?.city)}
            helperText={formik.touched.pickupAddress?.city && formik.errors.pickupAddress?.city}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="pickupAddress.state"
            label="State"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.state && Boolean(formik.errors.pickupAddress?.state)}
            helperText={formik.touched.pickupAddress?.state && formik.errors.pickupAddress?.state}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerFormStep2;
