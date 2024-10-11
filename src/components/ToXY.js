// import axios from 'axios';
//
// function add_to_xy(places, map) {
//
//     places.forEach((place) => {
//
//         const params = {
//
//             service: "address",
//             request: "GetCoord",
//             version: "2.0",
//             crs: "EPSG:4326",
//             type: "ROAD",
//             address: place[1],
//             format: "json",
//             errorformat: "json",
//             key: "471A38EF-8978-3AEC-8B4A-D47CDFD4CA14"
//
//         };
//
//         axios.get('/req/address', { params })
//             .then(response => {
//                 const path = response.data.response.result
//
//                 if (path?.point) {
//                     place.push(path.point);
//                     console.log(path.point['x']);
//                     let marker = new window.google.maps.Marker({
//                         position: { lng: parseFloat(path.point['x']), lat: parseFloat(path.point['y'] )},
//                         map: map
//                     });
//                     marker.setMap(map);
//                 }else{
//                     place.push(null);
//                 }
//             })
//             .catch(error => {
//                 // console.error("Error fetching coordinates:", error);
//                 place.push(null);
//             });
//
//     });
//     return places;
// }
// function Stores(map) {
//
//     let places = [];
//     axios.get('http://openAPI.seoul.go.kr:8088/6d476e6d576d797537377555514270/json/ListPriceModelStoreService/1/50/')
//         .then(response => {
//             places.push(response.data.ListPriceModelStoreService.row.map(place => [place.SH_NAME, place.SH_ADDR]))
//             places = add_to_xy(places[0], map);
//         })
//         .then(() => {
//             places.forEach((place) => {
//
//                 let marker = new window.google.maps.Marker({
//                     position: place[2],
//                     map: map
//                 });
//
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching stores:", error);
//         });
//
//
//     return places;
// }
//
// export default Stores;