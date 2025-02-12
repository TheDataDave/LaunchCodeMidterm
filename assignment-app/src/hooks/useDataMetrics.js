/*
@param data: data retrieved from the API, this will be the filtered data
@param countryCode: used for the Intl.Number format

@returns: the metricFields i.e (abbrev.) App usage, screen on time, number of apps install, age as 
an object with each containing {average, median} formatted.
*/
export default function useDataMetrics(data, locale) {
    const metricFields = [
        "App Usage Time (min/day)",
        "Screen On Time (hours/day)",
        "Number of Apps Installed",
        "Age"
    ]

    // Format number to specified locale and 2 digits
    function formatNumber(num) {
        return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(num);
    }

    /* 
    @param field: provided one of the metricFields values above

    @return: {average, median} formatted Intl average and median values
    
    uses the parent functions arguments to format the data for the average and median values
    given the specified field from metricFields
    */
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

        // Ensure we always reuturn a number, 0 as fallback
        const formattedAvg = formatNumber(average) || 0;
        const formattedMed = formatNumber(median) || 0;

        return { average: formattedAvg, median: formattedMed };
    }

    // Created all of our metric data here
    const appUsage = calculateMetrics(metricFields[0]);
    const screenOnTime = calculateMetrics(metricFields[1]);
    const numberOfApps = calculateMetrics(metricFields[2]);
    const age = calculateMetrics(metricFields[3]);

    return { appUsage, screenOnTime, numberOfApps, age };
}