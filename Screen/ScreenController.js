({
	goTo : function(component, event, helper) {
        let pageReference = {
			type: 'standard__navItemPage',
			attributes: {
				'apiName': 'Screen2',
			}
		};

		component.find("navService").navigate(pageReference)
	}
})