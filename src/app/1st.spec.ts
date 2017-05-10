// describe('1st tests', () => {
//   it('true is true', () => expect(true).toBe(true));
// });

// import { parseMetadata, constructGraphLinksFromFullPath } from '../app/graph-structure'
// import { apiService } from '../api-explorer-svc'
// import { formatRequestHeaders } from "../api-explorer-helpers";
// // import { saveHistoryToLocalStorage, loadHistoryFromLocalStorage } from "../app/history";
// import { GraphApiCall } from "../app/base";

// describe("Graph Structural Tests", function() {

//   before(function() {
//     return new Promise((resolve, revoke) => {
//       angular.module('MockApp', []).controller('MockAppCtrl', function ($http) {
//         apiService.init($http);
//         resolve();
//       });
//     });
//   })

//   describe('Metadata download and parsing', function() {
//     describe('Download metadata', function() {
//       it('should download v1.0 metadata', function() {
//         return parseMetadata("v1.0");
//       });
//       it('should download beta metadata', function() {
//         return parseMetadata("beta");
//       });
//       it('should error on downloading v5.x metadata', function() {
//         return new Promise((resolve, reject) => {
//           return parseMetadata("5.x").then(reject).catch(resolve);
//         });
//       });
//     });
//   });

//   describe('Graph structures', function() {
//     describe("Path parsing from metadata graph", function() {
//       it("https://graph.microsoft.com/v1.0/me => [user]", function() {
//         let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/v1.0/me");
//         chai.assert.equal(links.length, 1)
//         chai.assert.equal(links[0].type, "microsoft.graph.user")
//       });

//       it("https://graph.microsoft.com/v1.0/me/drive/quota => [user] -> [drive] -> [drive quoata]", function() {
//         let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/drive/quota");
//         chai.assert.equal(links.length, 3)

//         chai.assert.equal(links[0].type, "microsoft.graph.user")
//         chai.assert.equal(links[0].isACollection, false)

//         chai.assert.equal(links[1].type, "microsoft.graph.drive")
//         chai.assert.equal(links[1].isACollection, false)

//         chai.assert.equal(links[2].type, "microsoft.graph.quota")
//         chai.assert.equal(links[2].isACollection, false)
//         chai.assert.equal(links[2].tagName, "Property")

//       });

//       it("https://graph.microsoft.com/v1.0/users/foobar@contoso.com/calendar => [users] -> [user] -> [calendar]", function() {
//         let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/v1.0/users/foobar@contoso.com/calendar");
//         chai.assert.equal(links.length, 3)

//         chai.assert.equal(links[0].type, "microsoft.graph.user")
//         chai.assert.equal(links[0].isACollection, true)

//         chai.assert.equal(links[1].type, "microsoft.graph.user")
//         chai.assert.equal(links[1].isACollection, false)
//         chai.assert.equal(links[1].name, "foobar@contoso.com")

//         chai.assert.equal(links[2].type, "microsoft.graph.calendar")
//         chai.assert.equal(links[2].isACollection, false)

//       });

//       it("https://graph.microsoft.com/beta/me/photos/ => [user] -> [profilePhoto collection]", function() {
//         let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/photos/");
//         chai.assert.equal(links.length, 2)

//         chai.assert.equal(links[0].type, "microsoft.graph.user")
//         chai.assert.equal(links[0].isACollection, false)

//         chai.assert.equal(links[1].type, "microsoft.graph.profilePhoto")
//         chai.assert.equal(links[1].isACollection, true)

//       });
      

//       it("https://graph.microsoft.com/beta/me/photos/x/width => [user] -> [profilePhoto collection] -> [profilePhoto] -> [width property]", function() {
//           let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/photos/x/width");
//           chai.assert.equal(links.length, 4)

//           chai.assert.equal(links[0].type, "microsoft.graph.user")
//           chai.assert.equal(links[0].isACollection, false)

//           chai.assert.equal(links[1].type, "microsoft.graph.profilePhoto")
//           chai.assert.equal(links[1].isACollection, true)

          
//           chai.assert.equal(links[2].type, "microsoft.graph.profilePhoto")
//           chai.assert.equal(links[2].isACollection, false)
//           chai.assert.equal(links[2].name, "x")

//           chai.assert.equal(links[3].name, "width")
//           chai.assert.equal(links[3].type, "Edm.Int32")
//           chai.assert.equal(links[3].tagName, "Property")
//       });

//       it("https://graph.microsoft.com/beta/me/city => [microsoft.graph.user] -> [city property]", function() {
//           let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/city");
//           chai.assert.equal(links.length, 2)

//           chai.assert.equal(links[0].type, "microsoft.graph.user")
//           chai.assert.equal(links[0].isACollection, false)
//           chai.assert.equal(links[0].tagName, "Singleton")

//           chai.assert.equal(links[1].tagName, "Property")
//           chai.assert.equal(links[1].isACollection, false)
//           chai.assert.equal(links[1].name, "city")
//           chai.assert.equal(links[1].type, "Edm.String")
//       });

      
//       it("https://graph.microsoft.com/beta/me/drive/quota => [user] -> [drive] -> [drive quoata]", function() {
//         let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/drive/quota");
//         chai.assert.equal(links.length, 3)

//         chai.assert.equal(links[0].type, "microsoft.graph.user")
//         chai.assert.equal(links[0].isACollection, false)

//         chai.assert.equal(links[1].type, "microsoft.graph.drive")
//         chai.assert.equal(links[1].isACollection, false)

//         chai.assert.equal(links[2].type, "microsoft.graph.quota")
//         chai.assert.equal(links[2].isACollection, false)
//         chai.assert.equal(links[2].tagName, "Property")

//       });

//     });
//   });
  
//   describe('Header Parsing', function() {
//     it ('Parses custom single line headers', function() {
//         chai.assert.deepEqual(formatRequestHeaders("A:B"), {A:"B"});
//     });

//     it('Parses multiline custom headers', function() {
//         chai.assert.deepEqual(formatRequestHeaders("A:B\nC:D"), {A:"B", C:"D"});
//     });

//     it('Parses multiline custom headers with extra line breaks before and after', function() {
//         chai.assert.deepEqual(formatRequestHeaders("\n\n\n\n\nA:B\n\n\n\nC:D\n\n\n"), {A:"B", C:"D"});        
//     });
//   });

  
//   // describe('Request history is saved', function() {
//   //     beforeEach(function() {
//   //         clearRequestHistory();
//   //     });

//   //     it ('A POST to /v2.5/me is saved', function() {
//   //         //create an object to store the api call
//   //         const historyObj:GraphApiCall = {
//   //           requestUrl: "https://graph.microsoft.com/v1.0/me/",           
//   //           method: "POST",
//   //           statusCode: 400
//   //         };

//   //         saveHistoryObject(historyObj);

//   //         const savedHistoryObj = fetchRequestHistory().pop();
//   //         chai.assert.equal(savedHistoryObj.method, historyObj.method)
//   //         chai.assert.equal(savedHistoryObj.requestUrl, historyObj.requestUrl)
//   //         chai.assert.equal(savedHistoryObj.duration, historyObj.duration)
//   //     });

//   //     it ('A GET to /beta/me is saved', function() {
//   //         //create an object to store the api call
//   //         const historyObj:GraphApiCall = {
//   //           requestUrl: "https://graph.microsoft.com/beta/me/",
//   //           method: "GET",
//   //           statusCode: 200
//   //         };
//   //         saveHistoryObject(historyObj);

//   //         const savedHistoryObj = fetchRequestHistory().pop();
//   //         chai.assert.equal(savedHistoryObj.method, historyObj.method)
//   //         chai.assert.equal(savedHistoryObj.requestUrl, historyObj.requestUrl)
//   //         chai.assert.equal(savedHistoryObj.duration, historyObj.duration)
//   //     });
//   // });
// });