sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.lists.controller.ListView", {
            onInit: function () {

                var oJsonList = new sap.ui.model.json.JSONModel();
                oJsonList.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJsonList);

            },

            onShowMessage:function(){
                var standartList = this.getView().byId("standardList");
                var selectItems = standartList.getSelectedItems();
                 if (selectItems.length === 0){
                    sap.m.MessageToast.show("No selection"); 
                 }else{
                 var oMessage = "Selection ";
                 
                 for (var item in selectItems ){
                     var context  = selectItems[item].getBindingContext();
                     var oContext = context.getObject();
                     oMessage = oMessage +  oContext.Material; 

                 }
                 sap.m.MessageToast.show(oMessage);  
                 }
            },

            onDelete:function(){

var standartList = this.getView().byId("standardList");
                var selectItems = standartList.getSelectedItems();
                
                 if (selectItems.length === 0){
                    sap.m.MessageToast.show("No selection"); 
                 }else{
                 var oMessage = "Selection ";
                 var oModel = this.getView().getModel(); 
                 var products = oModel.getProperty("/Products");
                 var arrayP = [];
                 for (var item in selectItems ){
                     
                     var context  = selectItems[item].getBindingContext();
                     var oContext = context.getObject();
                     oMessage = oMessage +  oContext.Material; 
                     arrayP.push(oContext.Id);
                 }
                 products = products.filter(function(p){
return !arrayP.includes(p.Id); 
                 });
                 oModel.setProperty("/Products",products);
                 standartList.removeSelections();
                 sap.m.MessageToast.show(oMessage);  
                 }
            },
            onDelete:function(oEvent){
var selectRow = oEvent.getParameter("listItem");
var context = selectRow.getBindingContext();
var splitPath = context.getPath().split("/"); 
var indexx = splitPath[splitPath.length-1];
var model = this.getView().getModel();
var products = model.getProperty("/Products");
products.splice(indexx,1);
model.refresh();

            }
        });
    });
