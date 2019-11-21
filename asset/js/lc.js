$(document).ready(function() {

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
                            <input class="form-control" type='text' name='secondary_diagnosis[]'>
                        </div>
                      `;
        newTextBoxDiv.after().html(newField);
        newTextBoxDiv.appendTo("#secondary_diagnosis_field");
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

]

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

$('.non_surgical_sub_form').click((e) => {
    data_id = e.currentTarget.dataset.id;
    let this_doctor = doctor_list[data_id - 1];
    for (var v in this_doctor) {
        $("label." + v).text(this_doctor[v]);
    }
});

$('.save_surgical_info').click(() => {
    var Total_Surgical_Charges1 = $('#total_fee1').attr('value') + $('#charged_gst_fee1').attr('value');
    var Total_Surgical_Charges2 = $("#total_fee2").attr('value') + $('#charged_gst_fee2').attr('value');
    $(".Total_Surgical_Charges1").text(Total_Surgical_Charges1);
    $(".Total_Surgical_Charges1").text(Total_Surgical_Charges2);
    $('#surgical_procedure_modal').modal('hide');
})