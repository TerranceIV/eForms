$(document).ready(function() {
    var id = 1;
    var patient_list = [{
        p_name: "Chan Ah Tow",
        p_gender: "Male",
        p_nric: "900816172368",
        p_age: "44",
        p_dob: "01/01/1975",
        p_address: "132 Yishun Street 11, Singapore 760132",
        p_medical_no: "AB123",
        acc_no: "AB8237861a",
        location: "07SPPRIVATE-11",
        date_of_admission: "19/10/2020",
        time_of_admission: "2:30",
        date_of_discharge: "30/10/2020",
        discharge_status: "Others",
    }, ]

    let this_patient = patient_list[id - 1];
    for (var v in this_patient) {
        $("label." + v).text(this_patient[v]);
    }
});