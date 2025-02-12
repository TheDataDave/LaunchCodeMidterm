/*
@param data: data retrieved from the API, this will be the filtered data
@param countryCode: used for the Intl.Number format

@returns: the metricFields i.e (abbrev.) App usage, screen on time, number of apps install, age as 
an object with each containing {average, median} formatted.
*/
export default function useDataMetrics(data, countryCode) {
    const metricFields = [
        "App Usage Time (min/day)",
        "Screen On Time (hours/day)",
        "Number of Apps Installed",
        "Age"
    ]

    function formatNumber(num) {
        return new Intl.NumberFormat(countryCode).format(num);
    }

    function calculateMetrics(field) {
        if (!data || data.length === 0) {
            return { average: 0, median: 0 }; // Handle empty data
        }

        const values = data.map(item => parseFloat(item[field])).sort((a, b) => a - b);
        const sum = values.reduce((acc, val) => acc + val, 0);
        const average = sum / values.length;

        let median;
        const mid = Math.floor(values.length / 2);
        if (values.length % 2 === 0) {
            median = (values[mid - 1] + values[mid]) / 2;
        } else {
            median = values[mid];
        }

        const formattedAvg = formatNumber(average) || 0;
        const formattedMed = formatNumber(median) || 0;

        return { average: formattedAvg, median: formattedMed };
    }

    const appUsage = calculateMetrics(metricFields[0]);
    const screenOnTime = calculateMetrics(metricFields[1]);
    const numberOfApps = calculateMetrics(metricFields[2]);
    const age = calculateMetrics(metricFields[3]);

    return { appUsage, screenOnTime, numberOfApps, age };
}