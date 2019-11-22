$(document).ready(function() {
    var id = window.location.href.split('?').pop();
    if (id >= 3 || id < 0) {
        window.location.href = "lc.html?1";
    }
    var patient_list = [{
            p_name: "Chan Ah Tow",
            nric: "900816172368",
            acc_no: "AB8237861a",
            date_admission: "19/10/2020",
            date_discharge: "30/10/2020",
            case_type: "Day Surgery",
            admitting_speciality: "08 General Surgery",
        }, {
            p_name: "Sutanto Budi Hartono",
            nric: "780816123368",
            acc_no: "AB8232456a",
            date_admission: "9/10/2020",
            date_discharge: "20/10/2020",
            case_type: "Day Surgery",
            admitting_speciality: "18 Obstetrics",
        }, {
            p_name: "Micheal Philip",
            nric: "900818372379",
            acc_no: "AB2379123697a",
            date_admission: "10/10/2020",
            date_discharge: "20/10/2020",
            case_type: "Day Surgery",
            admitting_speciality: "32 Urology",
        }

    ]

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

$("select#surgical_procedure").change(function() {
    var selectedSP = $(this).children("option:selected").html();

    $('#surgical_procedure_modal').modal('show');
    $('#surgical_procedure_modal').find('.modal-title').text(selectedSP);
    // alert("You have selected the surgical procedure - " + selectedSP);
});
var doctor_list = [{
        type: "Principal Surgeon",
        name: "Dr Richard Chew Kim Huat",
        mcr: "01877E",
        date_procedure: "17/7/2019",
        start_ot: "09:26",
        end_ot: "10:33",
        surgical_procedure: "SA704B : Breasts, Lumps, imaging Guided Vaccum assisted Biopsy / Mammodome, Single lesion"

    }, {
        type: "Anaesthetist",
        name: "Dr Chong Kwan Yin",
        mcr: "03792C",
        date_procedure: "17/7/2019",
        start_ot: "10:26",
        end_ot: "10:43",
        surgical_procedure: "SA704B : Breasts, Lumps, imaging Guided Vaccum assisted Biopsy / Mammodome, Single lesion"

    }

];

var data_id;
$('.sub_form').click((e) => {
    data_id = e.currentTarget.dataset.id;
    let this_doctor = doctor_list[data_id - 1];
    for (var v in this_doctor) {
        $("label." + v).text(this_doctor[v]);
    }
});

$(".save_other_fees").click(() => {
    let other_fees = [];
    let total_other_fees = 0.00;

    for (let i = 1; i <= 6; i++) {
        other_fees.push($("input[name='other_fees" + i + "']").val());
        $("input[name='other_fees" + i + "']").value = "";
    }
    for (k in other_fees) {
        total_other_fees = parseFloat(total_other_fees) + parseFloat(other_fees[k]);

    }
    $('#sub_form_modal').modal('hide');
    $("span#other_fee" + data_id).text("$" + total_other_fees.toFixed(2)).attr("value", total_other_fees.toFixed(2));
    cal_fees(data_id);
    cal_gst_fees(data_id);
});

var default_fee = "$0.00";
$("input[name='professional_fee1']").keyup(() => {
    cal_fees(1);
    cal_gst_fees(1);
});
$("input[name='implant_fee1']").keyup(() => {
    cal_fees(1);
    cal_gst_fees(1);
});

$("input[name='professional_fee2']").keyup(() => {
    cal_fees(2);
    cal_gst_fees(2);
});
$("input[name='implant_fee2']").keyup(() => {
    cal_fees(2);
    cal_gst_fees(2);
});

function cal_gst_fees(data_id = 0) {
    $("select[name='gst" + data_id + "']").val("");
    $("#charged_gst_fee" + data_id).text(default_fee).attr("value", "0.00");
}

function cal_fees(data_id = 0) {
    let p_f = $("input[name='professional_fee" + data_id + "']").val();
    let i_f = $("input[name='implant_fee" + data_id + "']").val();
    let o_f = $("#other_fee" + data_id).attr('value');
    let total_fee = 0.00;
    total_fee = parseFloat(total_fee) + parseFloat(p_f) + parseFloat(i_f) + parseFloat(o_f);
    $("#total_fee" + data_id).text("$" + total_fee.toFixed(2)).attr("value", total_fee.toFixed(2));
}

$("select[name='gst1']").change(function() {
    var selectedSP = $(this).children("option:selected").val();
    var charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            var gst_rate = 0.07;
            let total_fee = $("#total_fee1").attr('value');
            charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            charged_gst_fee = 0.00;
            break;
        case "not_registered":
            charged_gst_fee = 0.00;
            break;
    }
    $("#charged_gst_fee1").text("$" + charged_gst_fee.toFixed(2)).attr("value", charged_gst_fee.toFixed(2));
});

$("select[name='gst2']").change(function() {
    var selectedSP = $(this).children("option:selected").val();
    var charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            var gst_rate = 0.07;
            let total_fee = $("#total_fee2").attr('value');
            charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            charged_gst_fee = 0.00;
            break;
        case "not_registered":
            charged_gst_fee = 0.00;
            break;
    }
    $("#charged_gst_fee2").text("$" + charged_gst_fee.toFixed(2)).attr("value", charged_gst_fee.toFixed(2));
});


$('button.save_surgical_info').click(() => {
    cal_total();
    $('#surgical_procedure_modal').modal('hide');

})

$(".save_other_fees2").click(() => {
    let other_fees = [];
    let total_other_fees = 0.00;

    for (let i = 1; i <= 6; i++) {
        other_fees.push($("input[name='other2_fees" + i + "']").val());
        $("input[name='other2_fees" + i + "']").value = "";
    }
    for (k in other_fees) {
        total_other_fees = parseFloat(total_other_fees) + parseFloat(other_fees[k]);

    }
    $('#sub_form_modal2').modal('hide');
    $("span#non_surgical_other_fee" + data_id).text("$" + total_other_fees.toFixed(2)).attr("value", total_other_fees.toFixed(2));
    cal_non_fees(data_id);
    cal_non_gst_fees(data_id);
});
$("input[name='inpatient_fee1']").keyup(() => {
    console.log("fired");
    cal_non_fees(1);
    cal_non_gst_fees(1);
});
$("input[name='inpatient_fee2']").keyup(() => {
    cal_non_fees(2);
    cal_non_gst_fees(2);
});

function cal_non_gst_fees(data_id = 0) {
    $("select[name='non_surgical_gst" + data_id + "']").val("");
    $("#non_surgical_charged_gst_fee" + data_id).text(default_fee).attr("value", "0.00");
}

function cal_non_fees(data_id = 0) {
    let i_f = $("input[name='inpatient_fee" + data_id + "']").val();
    let o_f = $("#non_surgical_other_fee" + data_id).attr('value');
    let total_fee = 0.00;
    total_fee = parseFloat(total_fee) + parseFloat(i_f) + parseFloat(o_f);
    $("#non_surgical_total_fee" + data_id).text("$" + total_fee.toFixed(2)).attr("value", total_fee.toFixed(2));
}

$("select[name='non_surgical_gst1']").change(function() {
    let selectedSP = $(this).children("option:selected").val();
    let non_surgical_charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            let gst_rate = 0.07;
            let total_fee = $("#non_surgical_total_fee1").attr('value');
            non_surgical_charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            non_surgical_charged_gst_fee = 0.00;
            break;
        case "not_registered":
            non_surgical_charged_gst_fee = 0.00;
            break;
    }
    $("#non_surgical_charged_gst_fee1").text("$" + non_surgical_charged_gst_fee.toFixed(2)).attr("value", non_surgical_charged_gst_fee.toFixed(2));
});

$("select[name='non_surgical_gst2']").change(function() {
    let selectedSP = $(this).children("option:selected").val();
    let non_surgical_charged_gst_fee = 0.00;
    switch (selectedSP) {

        case "charged":
            let gst_rate = 0.07;
            let total_fee = $("#non_surgical_total_fee2").attr('value');
            non_surgical_charged_gst_fee = parseFloat(total_fee) * parseFloat(gst_rate);
            break;
        case "waived":
            non_surgical_charged_gst_fee = 0.00;
            break;
        case "not_registered":
            non_surgical_charged_gst_fee = 0.00;
            break;
    }
    $("#non_surgical_charged_gst_fee2").text("$" + non_surgical_charged_gst_fee.toFixed(2)).attr("value", non_surgical_charged_gst_fee.toFixed(2));
});
$('.non_surgical_sub_form').click((e) => {
    data_id = e.currentTarget.dataset.id;
    let this_doctor = doctor_list[data_id - 1];
    for (var v in this_doctor) {
        $("label." + v).text(this_doctor[v]);
    }
});

$('button.save_non_surgical_info').click(() => {
    cal_total();
    alert("Total Non-Surgical Charges saved");
})


function cal_total() {

    // surgical charges
    let total_fee1 = $('#total_fee1').attr('value');
    let total_fee2 = $('#total_fee2').attr('value');
    let charged_gst_fee1 = $('#charged_gst_fee1').attr('value');
    let charged_gst_fee2 = $('#charged_gst_fee2').attr('value');

    let Total_Surgical_Charges1 = parseFloat(total_fee1) + parseFloat(charged_gst_fee1);
    let Total_Surgical_Charges2 = parseFloat(total_fee2) + parseFloat(charged_gst_fee2);
    $(".Total_Surgical_Charges1").text("$" + Total_Surgical_Charges1.toFixed(2)).attr("value", Total_Surgical_Charges1.toFixed(2));
    $(".Total_Surgical_Charges2").text("$" + Total_Surgical_Charges2.toFixed(2)).attr("value", Total_Surgical_Charges2.toFixed(2));

    //non_surgical charges
    let non_surgical_total_fee1 = $('#non_surgical_total_fee1').attr('value');
    let non_surgical_total_fee2 = $('#non_surgical_total_fee2').attr('value');
    let non_surgical_charged_gst_fee1 = $('#non_surgical_charged_gst_fee1').attr('value');
    let non_surgical_charged_gst_fee2 = $('#non_surgical_charged_gst_fee2').attr('value');

    let Total_Non_Surgical_Charges1 = parseFloat(non_surgical_total_fee1) + parseFloat(non_surgical_charged_gst_fee1);
    let Total_Non_Surgical_Charges2 = parseFloat(non_surgical_total_fee2) + parseFloat(non_surgical_charged_gst_fee2);
    $(".Total_Non_Surgical_Charges1").text("$" + Total_Non_Surgical_Charges1.toFixed(2)).attr("value", Total_Non_Surgical_Charges1.toFixed(2));
    $(".Total_Non_Surgical_Charges2").text("$" + Total_Non_Surgical_Charges2.toFixed(2)).attr("value", Total_Non_Surgical_Charges2.toFixed(2));

    //Total charges
    let Total_Charges1 = parseFloat(Total_Surgical_Charges1) + parseFloat(Total_Non_Surgical_Charges1);
    let Total_Charges2 = parseFloat(Total_Surgical_Charges2) + parseFloat(Total_Non_Surgical_Charges2);
    $(".Total_Charges1").text("$" + Total_Charges1.toFixed(2)).attr("value", Total_Charges1.toFixed(2));
    $(".Total_Charges2").text("$" + Total_Charges2.toFixed(2)).attr("value", Total_Charges2.toFixed(2));
}