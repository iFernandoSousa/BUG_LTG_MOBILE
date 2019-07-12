# Step by step to reproduce the problem
Bug related to Lightning Component in Mobile [iOS or Android]


<a href="https://githubsfdeploy.herokuapp.com?owner=iFernandoSousa&repo=BUG_LTG_MOBILE">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
<br/><br/>

**Title:** Mobile Application stop loading Lightning Component, after call window.history.back() method

**Involved:** iOS and Android

**Step by step to reproduce the problem:**
1) Login in a Salesforce ORG (Developer, Sandbox or Playground is affected too)
2) Make sure that "My Domain" is properly set up and configured
3) Make sure this in the "Lightning Experience"
4) On the top right menu, click on the gear and choose: [Developer Console]
5) In the Developer Console screen, select: File -> New -> Lightning Component
  * a. Enter the name of the component as "Screen"
  * b. Check the options: Lightning Tab and Lightning Page options
  * c. Click on [Submit] Button
6) In the component body, insert the code:
```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes" access="global" >
	<lightning:navigation aura:id="navService"/>
    <lightning:button onclick="{!c.goTo}">Go to Screen 2</lightning:button> 
</aura:component>
```
7) On the Right menu, click on the option Controller, e insert the code bellow:
```
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
```
8) On the Developer Console Screen, click again on menu File -> New -> Lightning Component
  * a. Enter the name of the component as "Screen2"
  * b. Check the options: Lightning Tab and Lightning Page options
  * c. Click on [Submit] Button
9) In the component body, insert the code:
```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes" access="global" >
    <lightning:button onclick="{!c.goBack}">Goback to Screen 1</lightning:button> 
</aura:component>
```
10) On the Right menu, click on the option Controller, and insert the code bellow:
```
({
	goBack : function(component, event, helper) {
		window.history.back()
	}
})
```
11) Access the SETUP and find for TABS
12) Looking for the session Lightning Component Tabs and click in the button [New]
13) Select the Screen component, fill in the Label and Name as "Screen," select any icon and click on the button [Next], make sure the tab is active for all profiles.
14) Repeat the process 12 and 13, this time pointing to the "Screen2" component, insert the Label and Name as "Screen2".
15) In Setup, find for "Salesforce Navigation" that is on Mobile session, insert the "Screen" and "Screen2" to the top of the selected list and click on button [Save].
16) Access the Salesforce Mobile app using a Mobile Phone.
  * **a. Attention: This problem just occurs on Mobile Phone, in emulator using Google Chrome this problem not happen.**
17) Open the Left menu, and choose "Screen"
  * a. Click on the button “Go to Screen 2”
  * b. On this new screen, click on the button “Goback to Screen 1”
  * c. Repeat this process, click on the button “Go to Screen 2”, now the screen will blink but not open the second screen "Screen2", and this is the main problem.
  
  
  
