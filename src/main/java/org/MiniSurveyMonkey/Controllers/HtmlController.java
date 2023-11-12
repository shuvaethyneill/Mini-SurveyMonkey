package org.MiniSurveyMonkey.Controllers;

import org.MiniSurveyMonkey.Forms.Form;
import org.MiniSurveyMonkey.Repositories.FieldRepo;
import org.MiniSurveyMonkey.Repositories.FormRepo;
import org.MiniSurveyMonkey.Repositories.ResponseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HtmlController {

    @Autowired
    private FormRepo formRepo;

    @Autowired
    private FieldRepo fieldRepo;

    @Autowired
    private ResponseRepo responseRepo;

    @GetMapping("/seeBaseForm")
    public String getAddresses(Model m){
        return "baseForm";
    }

    @GetMapping("/textField")
    public String getTextField(Model m){
        return "textField";
    }

    @GetMapping("/form/{id}")
    public String getTextField(@PathVariable(value = "id") String formId, Model m){
        m.addAttribute("formId", formId);
        return "viewForm";
    }

}
