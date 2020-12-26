/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
    Box,
    createStyles,
    Grid,
    Paper,
    Slider,
    TextField,
    Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { Doughnut } from "react-chartjs-2";

const useStyles = makeStyles((theme) =>
    createStyles({
        bg: {
            width: "100%",
        },
        mainHeader: {
            padding: "10%",
            [theme.breakpoints.up("sm")]: {
                padding: "60px 50px",
            },
            color: "#F75D33",
        },
        bolder: {
            fontWeight: "bold",
            margin: "5px 0px",
        },
        topHeadingSubTitle: {
            color: "#fff",
            maxWidth: "800px",
        },
        root: {
            flexGrow: 1,
            margin: "40px 20px 20px",
        },
        paper: {
            boxShadow: "none",
        },
        carsTextField: {
            width: "100%",
            padding: "10px",
        },
        amountSection: {
            marginBottom: "40px",
            display: "flex",
            border: "1px solid #F75D33",
        },
        amountLabel: {
            padding: "6px 10px",
            background: "#F75D33",
            color: "#fff",
            fontSize: "22px",
        },
        amountInput: {
            padding: "6px 10px",
            fontSize: "22px",
            color: "#000",
            display: "flex",
        },
        inputLabels: {
            boxShadow: "none",
            marginBottom: "40px",
        },
        amountInputStyle: {
            border: "none",
            fontSize: "22px",
            outline: "none",
        },
        sliderInputValue: {
            display: "flex",
            justifyContent: "space-between",
        },
        sliderInputLabel: {
            borderBottom: "1px solid #F75D33",
        },
        sliderValues: {
            border: "1px solid #7F8388",
            padding: "2px 2px 2px 32px",
            width: "fit-content",
        },
        sliderUnit: {
            background: "#EEEDF0",
            marginLeft: "5px",
            padding: "0 5px",
        },
        emiSection: {
            background: "#EEEDF0",
            margin: "80px 20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            [theme.breakpoints.down("sm")]: {
                margin: "20px 10px",
            },
        },
        emiValueSection: {
            boxShadow: "none",
            background: "#EEEDF0",
            padding: "60px 0",
            [theme.breakpoints.down("sm")]: {
                padding: "20px",
            },
        },
        emiValue: {
            color: "#F75D33",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            background: "none",
            fontSize: "20px",
            textAlign: "center",
            margin: "10px auto 20px",
        },
        emiRupeeIcon: {
            marginRight: "10px",
        },
    })
);

const UserSlider = withStyles({
    root: {
        color: "#FEC002",
        height: 10,
    },
    thumb: {
        height: 12,
        width: 15,
        background: "#FEC002",
        marginTop: -1,
        marginLeft: -1,
    },
    track: {
        height: 10,
        borderRadius: 4,
    },
    rail: {
        height: 10,
        borderRadius: 4,
        backgroundColor: "#7F8388",
    },
})(Slider)

const SliderMarks = {
    marksTenure: [
        {
            value: 0,
            label: "0",
        },
        {
            value: 84,
            label: "84",
        },
    ],
    marksInt: [
        {
            value: 0,
            label: "0",
        },
        {
            value: 20,
            label: "20",
        },
    ],
    marksDownPayment: [
        {
            value: 0,
            label: "0",
        },
        {
            value: 100,
            label: "100",
        },
    ],
}

export default function emiCalculator() {
    const classes = useStyles();
    const [amount, setAmount] = React.useState(100000);
    const [downPayment, setDownPayment] = React.useState(30);
    const [tenure, setTenure] = React.useState(12);
    const [interest, setInterest] = React.useState(10);
    const maxDownPayment = 100;
    const maxTenure = 84;
    const maxInt = 20;
    const minAmount = 0;

    let downPaymentPaid = Math.round(amount * (downPayment / 100));
    let amountToBePaid = downPayment ? amount - downPaymentPaid : amount;
    let interestPerMonth = interest / 1200;
    let emi = interest ? (tenure
        ? Math.round(
            (amountToBePaid * interestPerMonth) /
            (1 - Math.pow(1 / (1 + interestPerMonth), tenure))
        )
        : 0) : amountToBePaid / tenure;
    let loanAmount = emi * tenure + downPaymentPaid;
    let intAmount = tenure && interest ? loanAmount - amount : 0;
    let totalPayableAmount = amountToBePaid + intAmount;

    // Graph Data
    const data = {
        labels: [
            `Loan Amount: ₹ ${amountToBePaid}`,
            `Interest Amount: ₹ ${intAmount}`,
        ],
        datasets: [
            {
                data: [amountToBePaid, intAmount],
                backgroundColor: ["#2CB742", "#FEC002"],
            },
        ],
    }
    return (
        <Box className={classes.bg}>
            <Box className={classes.mainHeader}>
                <Typography className={classes.bolder} variant="h2">
                    EMI Calculator
                </Typography>
            </Box>
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Paper className={classes.paper}>
                                <TextField
                                    className={classes.carsTextField}
                                    id="standard-basic"
                                    label="Enter Brand Name"
                                    color="secondary"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Paper className={classes.paper}>
                                <TextField
                                    className={classes.carsTextField}
                                    id="standard-basic"
                                    label="Enter Model Name"
                                    color="secondary"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Paper className={classes.paper}>
                                <TextField
                                    className={classes.carsTextField}
                                    id="standard-basic"
                                    label="Enter Variant"
                                    color="secondary"
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        <Paper className={classes.paper}>
                            <form>
                                <div className={classes.amountSection}>
                                    <div className={classes.amountLabel}>
                                        <label htmlFor="amount">Car Price</label>
                                    </div>
                                    <div className={classes.amountInput}>
                                        <span>₹</span>
                                        <input
                                            className={classes.amountInputStyle}
                                            min={minAmount}
                                            type="number"
                                            name="amount"
                                            value={Number(amount)}
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Paper>
                        {/* Down Payment   */}
                        <Paper className={classes.paper}>
                            <div className={classes.sliderInputValue}>
                                <Paper className={classes.inputLabels}>
                                    <Typography>
                                        <strong>
                                            <span className={classes.sliderInputLabel}>
                                                Down Payment
                      </span>{" "}
                      (%)
                    </strong>
                                    </Typography>
                                </Paper>
                                <Paper className={classes.inputLabels}>
                                    <Typography className={classes.sliderValues}>
                                        {downPayment}
                                        <span className={classes.sliderUnit}>%</span>
                                    </Typography>
                                </Paper>
                            </div>
                            <UserSlider
                                value={downPayment}
                                onChange={(event, dValue) => {
                                    setDownPayment(dValue)
                                }}
                                valueLabelDisplay="on"
                                marks={SliderMarks.marksDownPayment}
                                max={maxDownPayment}
                            />
                        </Paper>
                        {/* Loan Tenure */}
                        <Paper className={classes.paper}>
                            <div className={classes.sliderInputValue}>
                                <Paper className={classes.inputLabels}>
                                    <Typography>
                                        <strong>
                                            <span className={classes.sliderInputLabel}>
                                                Loan Tenure
                      </span>{" "}
                      (In Months)
                    </strong>
                                    </Typography>
                                </Paper>
                                <Paper className={classes.inputLabels}>
                                    <Typography className={classes.sliderValues}>
                                        {tenure}
                                        <span className={classes.sliderUnit}>M</span>
                                    </Typography>
                                </Paper>
                            </div>
                            <UserSlider
                                value={tenure}
                                onChange={(event, tValue) => {
                                    setTenure(tValue)
                                }}
                                valueLabelDisplay="on"
                                marks={SliderMarks.marksTenure}
                                max={maxTenure}
                            />
                        </Paper>
                        {/* Interest Rate */}
                        <Paper className={classes.paper}>
                            <div className={classes.sliderInputValue}>
                                <Paper className={classes.inputLabels}>
                                    <Typography>
                                        <strong>
                                            <span className={classes.sliderInputLabel}>
                                                Interest Rate
                      </span>{" "}
                      (Per Annum)
                    </strong>
                                    </Typography>
                                </Paper>
                                <Paper className={classes.inputLabels}>
                                    <Typography className={classes.sliderValues}>
                                        {interest}
                                        <span className={classes.sliderUnit}>%</span>
                                    </Typography>
                                </Paper>
                            </div>
                            <UserSlider
                                value={interest}
                                onChange={(event, iValue) => {
                                    setInterest(iValue)
                                }}
                                valueLabelDisplay="on"
                                step={0.1}
                                marks={SliderMarks.marksInt}
                                max={maxInt}
                            />
                        </Paper>
                    </Grid>
                    {/* EMI Section */}
                    <Grid className={classes.emiSection} item xs={12} sm={12} md={12} lg={4}>
                        <Paper className={classes.emiValueSection}>
                            <Typography className={classes.bolder} variant="h6">
                                Equated Monthly Installments (EMI)
              </Typography>
                            <NumberFormat
                                className={classes.emiValue}
                                thousandSeparator={true}
                                thousandsGroupStyle="lakh"
                                prefix={"₹ "}
                                value={emi}
                            />
                            <Typography className={classes.bolder} variant="h6">
                                Total Amount Payable
              </Typography>
                            <NumberFormat
                                style={{ marginBottom: 0 }}
                                className={classes.emiValue}
                                thousandSeparator={true}
                                thousandsGroupStyle="lakh"
                                prefix={"₹ "}
                                value={totalPayableAmount}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3}>
                        <Paper className={classes.paper}>
                            <Doughnut
                                data={data}
                                width={100}
                                height={100}
                                options={{
                                    rotation: 1 * Math.PI,
                                    circumference: 1 * Math.PI,
                                    responsive: true,
                                    legend: {
                                        position: "bottom",
                                        onClick: (e) => e.stopPropagation(),
                                        labels: {
                                            fontSize: 18,
                                            fontColor: "#F75D33",
                                        },
                                    },
                                    animation: {
                                        duration: 2000,
                                        animateRotate: true,
                                        animateScale: false,
                                    },
                                    tooltips: {
                                        callbacks: {
                                            label: function (tooltipItem, data) {
                                                let label = data.labels[tooltipItem.index]
                                                return " " + label
                                            },
                                        },
                                    },
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}
