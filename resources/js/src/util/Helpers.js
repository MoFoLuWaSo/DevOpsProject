class Helpers {

    static objectFormBuilder(form, object) {


        for (let name in object) {

            if (object.hasOwnProperty(name)) {
                if (object[name] === undefined || object[name] === null || object[name] === "null") {

                    form.append(name, '');
                } else {

                    form.append(name, object[name]);
                }
            }
        }

        return form;
    }

    static normalizeJson(object) {
        let newObject = {};
        for (let name in object) {

            if (object.hasOwnProperty(name)) {
                newObject[name] = object[name] ? object[name].toString() : '';
            }
        }

        return newObject;

    }

    static normalizeJsonStringify(object) {
        let newObject = {};
        for (let name in object) {

            if (object.hasOwnProperty(name)) {
                newObject[name] = object[name] !== null ? object[name].toString() : '';
            }
        }

        return newObject;

    }

    getDeviceName() {
        let name = navigator.appCodeName;
        return name.replace(" ", "_").toLowerCase();
    }

    static getIdFromSlug(slug) {
        let name = slug.split("-");
        return name[name.length - 1];

    }

    static getTitleFromSlug(slug) {
        if (slug) {

            let name = slug.split("-");
            let length = name.length - 1;
            let title = "";
            for (let i = 0; i < length; i++) {
                title += name[i] + " ";
            }
            return title;
        }
        return "";

    }

    static getMomentDateFromSQL(date, moment) {
        if (date) {
            return moment(new Date(date));
        }
        return '';
    }

    static getSQLDateFromMoment(date) {
        let dateFormat = 'YYYY-MM-DD';
        if (date) {

            return date.format(dateFormat);
        }
        return '';
    }

    static getSQLDateTimeFromMoment(date) {
        let dateFormat = 'YYYY-MM-DD HH:mm:ss';
        if (date) {

            return date.format(dateFormat);
        }
        return '';
    }

    static getSQLTimeFromMoment(date) {
        let dateFormat = 'HH:mm:ss';
        if (date) {

            return date.format(dateFormat);
        }
        return '';
    }

    static displayDate(date) {
        let dateFormat = 'YYYY-MM-DD';
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        if (date) {
            let dateTime = new Date(date);
            let day = dateTime.getDate();
            let month = months[dateTime.getMonth()];
            let year = dateTime.getFullYear();
            return day + " " + month + ", " + year;
        }
        return '';
    }

    static displayDateTime(date) {

        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if (date) {
            let dateTime = new Date(date);

            return dateTime.getDate() + " " + months[dateTime.getMonth()] + " " + dateTime.getFullYear() + " " + new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours() - 1, dateTime.getMinutes(), dateTime.getSeconds()).toLocaleTimeString();

        }
        return '';
    }

    static download(filename, path) {
        let element = document.createElement('a');
        element.setAttribute('href', path);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    static downloadOrOpen(filename, path) {
        let element = document.createElement('a');
        element.setAttribute('href', path);
        element.setAttribute('target', '_blank');
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    static genderFromValue(value) {
        if (value) {
            if (value.toString() === '1') {
                return "Female";
            } else if (value.toString() === '2') {
                return "Male";
            }
        }
        return "Undecided";
    }

    static normalizeValue(value) {
        if (value) {
            return value;
        }
        return "";
    }

    static createSlug(title, id) {
        return title.replace(" ", "-") + "-" + id;
    }

    /*------------------------------
 *
 * ------------------------------
 *The authorize me must
 *ensure that it
 *has the application, type
 * and menu
 *
  */

    static authorizeMe(auth, type, menu) {
        try {

            return auth[type].includes(menu);

        } catch (e) {

        }
        return false;

    }

    static zeros(size) {
        let zeroArray = [];
        for (let i = 0; i < size; i++) {
            zeroArray[i] = 0;
        }

        return zeroArray;
    }

    static range(data, start, end) {
        let newData = [];
        let j = 0;
        for (let i = start; i < end; i++) {


            newData[j] = data[i];
            j++;

        }

        return newData;
    }

    static rangeAndSum(data, start, end) {
        let newData = [];
        let j = 0;
        let sum = 0;
        for (let i = start; i < end; i++) {
            newData[j] = data[i];
            sum += newData[j]['average'];

            j++;
        }

        return [newData, sum];
    }

    static computeSimpleMovingAverage(data, numPeriods) {
        let avg_prev = 0;
        let ratedAverage = [];
        let len = data.length;
        // let inputs = [];
        let sumAverage = 0.00;
        for (let i = 0; i <= len - numPeriods; i++) {
            let currentAverage = 0.00;
            let t = i + numPeriods;

            for (let j = i; j < t && j <= len; j++) {
                currentAverage += parseFloat(data[j]['close_price']) / numPeriods;
            }
            // inputs[i] = parseFloat(data[i]['close_price']);
            ratedAverage.push({set: data.slice(i, i + numPeriods), average: currentAverage});
            avg_prev = currentAverage;
            sumAverage += currentAverage;
        }

        return [ratedAverage, sumAverage];
    }

    static computeExponentialMovingAverage(data) {
        // let financeData = [];
        let numPeriods = 20;//300 minutes / 5 hours moving average
        let k = 2 / (numPeriods + 1);
        let emaPrice = 0;
        let emaList = [];
        data.map((value, index) => {
            let closePrice = parseFloat(value['close_price']);
            if (emaPrice === 0) {
                emaPrice = closePrice;
            } else {
                emaPrice = (closePrice - emaPrice) * k + emaPrice;
            }

            //  value['ema_price'] = emaPrice;
            emaList[index] = emaPrice;
            // financeData[index] = value;
        });

        return emaList;
    }

    static computeColumnIndices(data) {
        let columnIndex = {};

        Object.keys(data[0]).map((value, index) => {
            columnIndex[value] = index;
        });
        return columnIndex;
    }

    static findMeanAndStandardDeviation(data, sum) {
        let len = data.length;
        let mean = sum / len;
        let meanSum = 0;
        data.map((value, index) => {
            meanSum += (value['average'] - mean) ** 2;
        });

        let variance = meanSum / len;
        let std = Math.sqrt(variance);
        return [mean, std]
    }


//     static splitAndNormalizeData(tradingData) {
//         //find moving average
//         let normalSma = this.computeSimpleMovingAverage(tradingData, 20);
//
//         let len = tradingData.length;
//
//
//         let trainDf = normalSma[0];
//         let trainSum = normalSma[1];
//
//
//         let meanAndStandardDeviation = this.findMeanAndStandardDeviation(trainDf, trainSum);
//
//         let trainMean = meanAndStandardDeviation[0];
//         let trainStd = meanAndStandardDeviation[1];
//
//         let normalTrain = this.normalizeDataAndOutput(trainDf, trainMean, trainStd);
//
//         trainDf = normalTrain[0];
//         // valDf = this.normalizeData(valDf, trainMean, trainStd);
//         //testDf = this.normalizeData(testDf, trainMean, trainStd);
// //this is where we stack our inputs
//         let inputs = trainDf.map((v, i) => {
//             return v['set'].map((val, j) => {
//                 return parseFloat(val['close_price'])
//             })
//         });
//
//         let outputs = normalTrain[1];
//
//         return {
//
//             trainDf: trainDf,
//             len: len,
//             trainMean: trainMean,
//             trainStd: trainStd,
//             inputs: inputs,
//             outputs: outputs,
//         };
//     }


    static splitAndNormalizeData(tradingData) {
        //find moving average
        let normalSma = this.computeSimpleMovingAverage(tradingData, 20);
        let data = normalSma[0];
        //split data 70%, 20%,10% for training, validation and test sets respectively
        //  let len = tradingData.length;

        //let train = this.rangeAndSum(data, 0, Math.floor(len * 0.7));

        //let trainDf = train[0];
        // let trainSum = train[1];
        // let valDf = this.range(data, Math.floor(len * 0.7), Math.floor(len * 0.9));
        //let testDf = this.range(data, Math.floor(len * 0.9), len);

        // let meanAndStandardDeviation = this.findMeanAndStandardDeviation(trainDf, trainSum);

        //let trainMean = meanAndStandardDeviation[0];
        //let trainStd = meanAndStandardDeviation[1];

        //let normalTrain = this.normalizeDataAndOutput(trainDf, trainMean, trainStd);

        //trainDf = normalTrain[0];
        //   valDf = this.normalizeData(valDf, trainMean, trainStd);
        // testDf = this.normalizeData(testDf, trainMean, trainStd);
//this is where we stack our inputs
        let inputs = data.map((v, i) => {
            return v['set'].map((val, j) => {
                return parseFloat(val['close_price'])
            })
        });

        let outputs = data.map(function (outp_f) {
            return outp_f['average'];
        });

        return {
            data: data,
            // trainDf: trainDf,
            //  valDf: valDf,
            //testDf: testDf,
            // len: len,
            //  trainMean: trainMean,
            // trainStd: trainStd,
            inputs: inputs,
            outputs: outputs,
        };
    }


    static splitAndNormalizeDataOriginal(tradingData) {
        //find moving average
        let normalSma = this.computeSimpleMovingAverage(tradingData, 20);
        let data = normalSma[0];
        //split data 70%, 20%,10% for training, validation and test sets respectively
          let len = tradingData.length;

        let train = this.rangeAndSum(data, 0, Math.floor(len * 0.7));

        let trainDf = train[0];
         let trainSum = train[1];
       //  let valDf = this.range(data, Math.floor(len * 0.7), Math.floor(len * 0.9));
        //let testDf = this.range(data, Math.floor(len * 0.9), len);

         let meanAndStandardDeviation = this.findMeanAndStandardDeviation(trainDf, trainSum);

        let trainMean = meanAndStandardDeviation[0];
        let trainStd = meanAndStandardDeviation[1];

       let normalTrain = this.normalizeDataAndOutput(trainDf, trainMean, trainStd);

        trainDf = normalTrain[0];
         //  valDf = this.normalizeData(valDf, trainMean, trainStd);
        // testDf = this.normalizeData(testDf, trainMean, trainStd);
//this is where we stack our inputs
        let inputs = trainDf.map((v, i) => {
            return v['set'].map((val, j) => {
                return parseFloat(val['close_price'])
            })
        });

        let outputs = trainDf.map(function (outp_f) {
            return outp_f['n_price'];
        });

        return {
            data: data,
            // trainDf: trainDf,
            //  valDf: valDf,
            //testDf: testDf,
            // len: len,
            //  trainMean: trainMean,
            // trainStd: trainStd,
            inputs: inputs,
            outputs: outputs,
        };
    }


    /*
        static splitAndNormalizeData(tradingData) {
            //find moving average
            let data = this.computeExponentialMovingAverage(tradingData);
            //split data 70%, 20%,10% for training, validation and test sets respectively
            let len = tradingData.length;
            let train = this.rangeAndSum(data, 0, Math.floor(len * 0.7));

            let trainDf = train[0];
            let trainSum = train[1];
            let valDf = this.range(data, Math.floor(len * 0.7), Math.floor(len * 0.9));
            let testDf = this.range(data, Math.floor(len * 0.9), len);
            //let numFeatures = Object.keys(data[0]).length;
            //let columnIndices = this.computeColumnIndices(data);
            let meanAndStandardDeviation = this.findMeanAndStandardDeviation(trainDf, trainSum);
            let trainMean = meanAndStandardDeviation[0];
            let trainStd = meanAndStandardDeviation[1];
            trainDf = this.normalizeData(trainDf, trainMean, trainStd);
            valDf = this.normalizeData(valDf, trainMean, trainStd);
            testDf = this.normalizeData(testDf, trainMean, trainStd);
            return {
                data: data,
                // numFeatures: numFeatures,
                //  columnIndices: columnIndices,
                trainDf: trainDf,
                train: train[0],
                valDf: valDf,
                testDf: testDf,
                len: len,
                trainMean: trainMean,
                trainStd: trainStd,
            };

        }
    */
    static normalizeData(data, mean, std) {

        let meanData = [];

        data.map((value, index) => {
            if (value) {

                let avg = value.average;
                value['n_price'] = (avg - mean) / std;

            }

            meanData[index] = value;
        });
        return meanData;
    }

    static normalizeDataAndOutput(data, mean, std) {

        let meanData = [];
        let outputs = [];
        data.map((value, index) => {
            let output = (value['average'] - mean) / std;
            value['n_price'] = output;
            //value = (value - mean) / std;
            outputs[index] = output;
            meanData[index] = value;
        });
        return [meanData, outputs];
    }


    static windowGenerator(inputWidth, shift, trainDf, valDf, testDf) {
        let totalWindowSize = inputWidth + shift;
    }

    static generateWindow(inputWidth, labelWidth = 1, shift = 1) {
        let totalWindowSize = inputWidth + shift;

    }

    static generateDataSets() {

    }

}

export default Helpers;
