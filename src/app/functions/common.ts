export function filterData(data, filterObj) {
    if (filterObj) {
        // assuming that today is Aug 15 2018
        let currentDate = new Date("Aug 15 2018");
        let sevenDaysInMilliseconds = 604800000;
        let filteredData = data.filter(x => (
            (x.companyname.toLowerCase().includes(filterObj.company == "" ? x.companyname.toLowerCase() : filterObj.company.toLowerCase())) &&
            (x.location.toLowerCase().includes(filterObj.location == "" ? x.location.toLowerCase() : filterObj.location.toLowerCase())) &&
            (x.skills.toLowerCase().includes(filterObj.skill == "" ? x.skills.toLowerCase() : filterObj.skill.toLowerCase()))         
        ));
        if (filterObj.job_type == "expiring") {
            filteredData = filteredData.filter(x => {
                if(x.enddate != "") {
                    let dateDiff = new Date(x.enddate).getTime() - currentDate.getTime(); 
                    return ((dateDiff > 0) && (dateDiff < sevenDaysInMilliseconds));
                }
                return false;
            });
        }
        if (filterObj.experience == "0") {
            filteredData = filteredData.filter(x => {
                return (x.experience.toLowerCase().includes('fresher')) || ((x.experience.match(/\d+/g)) ? (x.experience.match(/\d+/g)[0] == "0") : false);
            });
        } else if (filterObj.experience != "-1") {
            filteredData = filteredData.filter(x => !(x.experience.toLowerCase().includes('fresher')));
            filteredData = filteredData.filter(x => {
                let experienceArr = x.experience.match(/\d+/g);
                if (experienceArr) {
                    return ( (+filterObj.experience >= experienceArr[0]) && (experienceArr[1] ? (+filterObj.experience <= experienceArr[1]) : true ) );
                }
                return false;
            });
        }
        return filteredData;
    } 
    return data;
}