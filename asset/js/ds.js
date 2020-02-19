$(document).ready(function() {
    var id = 1;
    var patient_list = [{
        p_name: "Chan Ah Tow",
        p_gender: "Male",
        p_nric: "S2201482Z",
        p_age: "44",
        p_dob: "01/01/1975",
        p_address: "132 Yishun Street 11, Singapore 760132",
        p_medical_no: "AB123",
        acc_no: "AB8237861a",
        location: "07SPPRIVATE-11",
        date_of_admission: "4/11/2019",
        time_of_admission: "2:30",
        date_of_discharge: "20/11/2019",
        discharge_status: "Others",
    }, ]

    let this_patient = patient_list[id - 1];
    for (var v in this_patient) {
        $("label." + v).text(this_patient[v]);
    }

    var counter = 2;
    $("#addButton").click(function() {

        // if (counter > 10) {
        //     alert("Only 10 textboxes allow");
        //     return false;
        // }
        var newTextBoxDiv = $(document.createElement('div'));

        var newField = `<div class="input-group" id="TextBoxDiv${counter}">
                            <div class="m_15"></div>
                            <div class="input-group-prepend">
                              <span class="input-group-text">${counter}.</span>
                            </div>
                            <input class="form-control" type='text' name='others_diagnosis[]'>
                        </div>
                      `;
        newTextBoxDiv.after().html(newField);
        newTextBoxDiv.appendTo("#others_diagnosis_field");
        counter++;
    });

    $("#removeButton").click(function() {
        if (counter == 2) {
            alert("At least 1 field of textbox for secondary diagnosis");
            return false;
        }
        counter--;

        $("#TextBoxDiv" + counter).remove();

    });
});