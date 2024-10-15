// import styles from '../css/App.css';
import "../css/Weather.css";
import React, {useState, useEffect, useRef} from "react";
import Dfs_xy_conv from "./ConvertCoordinate.jsx";

function Weather() {
    // API 키 및 URL 설정
    const WEATHER_API_KEY =
        "gDPIDuwpKRR1jcaE7qw%2BHclN%2FXEwsjG6GlL%2FgFEQvIRp%2Bg7h4c1B0K2LOvpUyXKOXTO6hOcPPQP1ll93s7wB1g%3D%3D";
    const GOOGLEMAP_KEY = "AIzaSyB4s6s19oGc65HQ7lfweyn0GSyZeZQ0Zyw";
    const WEATHER_URL =
        "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/";
    const MID_WEATHER_URL = "https://apis.data.go.kr/1360000/MidFcstInfoService/";
    const WEATHER_PARAMETER = "pageNo=1&numOfRows=1000&dataType=JSON";

    // 요일 배열
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    // 상태 변수 선언
    const [weathers, setWeathers] = useState(); // 날씨 데이터
    const [region, setRegion] = useState(); // 지역 정보
    const [tmx, setTmx] = useState(); // 최고 기온
    const [tmn, setTmn] = useState(); // 최저 기온
    const [latitude, setLatitude] = useState(); // 위도
    const [longitude, setLongitude] = useState(); // 경도
    const [fcstTimeR, setFcstTimeR] = useState([]); // 예보 시간
    const [ptyR, setPtyR] = useState([]); // 강수형태
    const [t1hR, setT1hR] = useState([]); // 기온
    const videoRef = useRef(); // 비디오 참조
    const videoSrc = "/video/"; // 비디오 소스 경로
    const [icons, setIcons] = useState(); // 아이콘 데이터
    const [temp, setTemp] = useState(); // 온도 데이터
    const [fcst, setFcst] = useState(); // 예보 정보

    // 날씨 데이터 변수 초기화
    let shrtWeathers;
    let fcstTime = [];
    let pty = [];
    let t1h = [];


    // LCC DFS 좌표변환을 위한 기초 자료
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    // 현재 날짜 및 시간 정보 가져오기
    let td = new Date();
    let year = td.getFullYear();
    let month =
        td.getMonth() + 1 < 10 ? "0" + (td.getMonth() + 1) : td.getMonth() + 1;
    let date = td.getDate() < 10 ? "0" + td.getDate() : td.getDate();
    let hours = td.getHours() < 10 ? "0" + td.getHours() : td.getHours();
    let bgHours = td.getHours(); // 배경 변경을 위한 시간
    let minutes = td.getMinutes() < 10 ? "0" + td.getMinutes() : td.getMinutes();
    let shrtToday = year + "" + month + "" + date; // 현재 날짜
    let shrtTime = minutes < 30 ? hours - 1 + "" + minutes : hours + "" + minutes; // 시간 계산
    let midTime = yesterday(6) + "0600"; // 어제 날짜와 시간
    let today = yesterday(2); // 오늘 날짜

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn =
        Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const sf = (Math.tan(Math.PI * 0.25 + slat1 * 0.5) * Math.cos(slat1)) / sn;
    const ro = (re * sf) / Math.tan(Math.PI * 0.25 + olat * 0.5);

    function dfs_xy_conv(code, v1, v2) {
        let rs = {};

        if (code === "toXY") {
            const ra = (re * sf) / Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
            let theta = v2 * DEGRAD - olon;

            if (theta > Math.PI) theta -= 2.0 * Math.PI;
            if (theta < -Math.PI) theta += 2.0 * Math.PI;

            theta *= sn;
            rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
            rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        } else {
            rs["x"] = v1;
            rs["y"] = v2;
            const xn = v1 - XO;
            const yn = ro - v2 + YO;
            let ra = Math.sqrt(xn * xn + yn * yn);
            if (sn < 0.0) ra = -ra;
            let alat = Math.pow((re * sf) / ra, 1.0 / sn);
            alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

            let theta;
            if (Math.abs(xn) <= 0.0) {
                theta = 0.0;
            } else if (Math.abs(yn) <= 0.0) {
                theta = Math.PI * 0.5;
                if (xn < 0.0) {
                    theta = -theta;
                }
            } else {
                theta = Math.atan2(xn, yn);
            }
            const alon = theta / sn + olon;
            rs["lat"] = alat * RADDEG;
            rs["lng"] = alon * RADDEG;
        }
        return rs;
    };

    // 어제 날짜 계산 함수
    function yesterday(time) {
        let y_year = year;
        let y_month = month;
        let y_date = date;
        if (hours < time) {
            if (date == "01") {
                if (month == "01") {
                    y_year = year - 1;
                    y_month = 12;
                    y_date = 31;
                } else {
                    y_month = td.getMonth() < 10 ? "0" + td.getMonth() : td.getMonth();
                    if (month in ["02", "04", "06", "09", "11"]) y_date = 31;
                    else if (month == "03") y_date = 29;
                    else y_date = 30;
                }
            } else
                y_date =
                    td.getDate() - 1 < 10 ? "0" + (td.getDate() - 1) : td.getDate() - 1;
        }
        return y_year + "" + y_month + "" + y_date;
    }

    // 사용자의 위치 정보를 요청하는 함수
    function requestWeather() {
        console.log("navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr) 시작");
        navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
        console.log("navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr) 완료");
    }

    // 위치 정보 성공적으로 가져온 경우
    function handleGeoSucc(position) {
        const latitude = position.coords.latitude; // 위도
        const longitude = position.coords.longitude; // 경도
        setLatitude(latitude);
        setLongitude(longitude);
        console.log("latitude", latitude);
        console.log("longitude", longitude);
        const rs = dfs_xy_conv("toXY", latitude, longitude); // 좌표 변환
        console.log("좌표 변환 완료");
        setLatitude(rs.x);
        setLongitude(rs.y);
        console.log(rs.x);
        console.log(rs.y);
        getWeather(rs.x, rs.y); // 날씨 정보 요청
    }

    // 위치 정보 가져오기 실패한 경우
    function handleGeoErr(err) {
        console.log("Geolocation is error! " + err);
    }

    // 날씨 정보 요청
    const getWeather = async (lat, lng) => {
        try {
            const response = await fetch(
                `${WEATHER_URL}getVilageFcst?serviceKey=${WEATHER_API_KEY}&${WEATHER_PARAMETER}&base_date=${today}&base_time=0200&nx=${lat}&ny=${lng}`
            );
            const json = await response.json();
            setWeathers(await json.response.body.items.item); // 날씨 데이터 저장
        } catch (e) {
            console.log(e);
        }
    };

    // 단기 날씨 정보 요청
    const getShrtWeather = async (lat, lng) => {
        try {
            const response = await fetch(
                `${WEATHER_URL}getUltraSrtFcst?serviceKey=${WEATHER_API_KEY}&${WEATHER_PARAMETER}&base_date=${shrtToday}&base_time=${shrtTime}&nx=${lat}&ny=${lng}`
            );
            const data = await response.json();
            const body = await data.response.body;
            const items = await body.items;
            const shrtWeathers = await items.item;
            // console.log(data.response.body.items.item);
            for (let i = 0; i < 60; i++) {
                if (shrtWeathers[i].category === "PTY") {
                    // console.log(shrtWeathers[i].fcstValue);
                    if (Number(shrtWeathers[i].fcstTime) < 1200) {
                        fcstTime.push(
                            "오전 " + shrtWeathers[i].fcstTime.substr(0, 2) + "시"
                        );
                    } else {
                        fcstTime.push(
                            "오후 " +
                            (Number(shrtWeathers[i].fcstTime.substr(0, 2)) - 12) +
                            "시"
                        );
                    }
                    console.log(shrtWeathers[i].fcstValue);
                    if (shrtWeathers[i].fcstValue === "0") pty.push("맑음");
                    else if (shrtWeathers[i].fcstValue in ["1", "2", "5", "6"])
                        pty.push("비");
                    else pty.push("눈");
                } else if (shrtWeathers[i].category === "T1H") {
                    t1h.push(shrtWeathers[i].fcstValue + "°C");
                }
            }


            // fetch(
            //   `${WEATHER_URL}getUltraSrtFcst?serviceKey=${WEATHER_API_KEY}&${WEATHER_PARAMETER}&base_date=${shrtToday}&base_time=${shrtTime}&nx=${lat}&ny=${lng}`
            // )
            //   .then((response) => response.json())
            //   .then((data) => {
            //     console.log(data.response.body.items.item);
            //     shrtWeathers = data.response.body.items.item;
            //     for (let i = 0; i < 60; i++) {
            //       if (shrtWeathers[i].category === "PTY") {
            //         if (Number(shrtWeathers[i].fcstTime) < 1200) {
            //           fcstTime.push(
            //             "오전 " + shrtWeathers[i].fcstTime.substr(0, 2) + "시"
            //           );
            //         } else {
            //           fcstTime.push(
            //             "오후 " +
            //               (Number(shrtWeathers[i].fcstTime.substr(0, 2)) - 12) +
            //               "시"
            //           );
            //         }
            //         console.log(shrtWeathers[i].fcstValue);
            //         if (shrtWeathers[i].fcstValue === "0") pty.push("맑음");
            //         else if (shrtWeathers[i].fcstValue in ["1", "2", "5", "6"])
            //           pty.push("비");
            //         else pty.push("눈");
            //       } else if (shrtWeathers[i].category === "T1H") {
            //         t1h.push(shrtWeathers[i].fcstValue + "°C");
            //       }
            //     }
            //   })
            //   .catch((error) => {
            //     console.error("getShrtWeather API 호출 중 오류 발생 : ", error);
            //   });
            setFcstTimeR(fcstTime);
            setPtyR(pty);
            setT1hR(t1h);
        } catch (e) {
            console.log(e);
        }
    };

    // 위치 정보를 이용해 지역명 가져오기
    const getGeo = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLEMAP_KEY}`
            );
            const json = await response.json();
            let address = await json.results; // 주소 정보
            let adr;
            for (let i = 0; i < 8; i++) {
                let array = address[i].types;
                if (array.includes("sublocality_level_2")) {
                    let a = address[i].formatted_address.split(" ");
                    if (a[a.length - 1].slice(-1) === "동") {
                        adr = a[a.length - 2] + " " + a[a.length - 1]; // 동 단위 주소
                        break;
                    }
                }
            }
            console.log(adr);
            setRegion(adr); // 지역 정보 저장
        } catch (e) {
            console.log(e);
        }
    };

    // 동영상 재생 속도 조절
    const setPlayBackRate = () => {
        videoRef.current.playbackRate = 0.6; // 비디오 재생 속도를 0.6배로 설정
    };

    // 시간에 따라 배경 비디오를 변경하는 함수
    function bgChangeByHour() {
        if (bgHours > -1 && bgHours < 6) {
            // 0 ~ 6시
            return videoSrc + "night.mp4";
        } else if (bgHours >= 6 && bgHours < 18) {
            // 6 ~ 18시
            return videoSrc + "sunny.mp4";
        } else if (bgHours >= 18 && bgHours < 20) {
            // 18 ~ 20시
            return videoSrc + "sunset.mp4";
        } else if (bgHours >= 20 && bgHours < 24) {
            // 20 ~ 24시
            return videoSrc + "night.mp4";
        }
    }

    // 날씨에 따라 배경 비디오를 변경하는 함수
    function bgChangeByClimate() {
        if (pty[0] === "비") {
            // 현재 날씨가 비일 경우
            return videoSrc + "rain.mp4";
        } else if (pty[0] === "눈") {
            // 현재 날씨가 눈일 경우
            return videoSrc + "snow.mp4";
        } else return bgChangeByHour(); // 그 외의 경우 시간에 따라 비디오 변경
    }

    useEffect(() => {
        console.log("requestWeather 시작");
        requestWeather();
    }, []);

    useEffect(() => {
        console.log("getShrtWeather lat, lon : ", latitude, " ", longitude);
        getShrtWeather(latitude, longitude); // 단기 날씨 정보 요청
    }, [weathers]);

    // useEffect(() => {
    //   if (weathers) {
    //     setTmn(weathers[48].fcstValue + "°C");
    //     console.log(weathers[48].fcstValue + "°C");
    //     setTmx(weathers[157].fcstValue + "°C");
    //     console.log(weathers[157].fcstValue + "°C");
    //   }
    // }, [weathers]);

    // useEffect(() => {
    //   getGeo(latitude, longitude);
    // }, [latitude, longitude]);

    return (
        <main>
            {/*<section className={styles.container}>
                <div className={styles.apiContainer}>
                    <div className={styles.weatherDetailWrap1}>
                        <ul>
                            <li>{region}</li>  지역 정보
                            <li>{t1hR[0]}</li>  현재 기온
                            <li>{ptyR[0]}</li>  현재 날씨 상태
                            <li>최고: {tmx} 최저: {tmn}</li>  최고 및 최저 기온
                        </ul>
                    </div>
                    <div id='hourly weather forecast'>
                        <p>시간별 일기예보</p>
                        <p>지금: {ptyR[0]} {t1hR[0]}</p>  현재 날씨 및 기온 표시
                        {fcstTimeR.slice(1, 6).map((time, index) => (
                            <p key={index}>{time}: {ptyR[index + 1]} {t1hR[index + 1]}</p> // 시간별 예보
                        ))}
                    </div>
                </div>
            </section>*/}
            <div className="jb_box">
                <video
                    className="background-video"
                    autoPlay
                    loop
                    muted
                    /*muted
                              autoPlay
                              playsInline
                              loop*/
                    ref={videoRef}
                    onCanPlay={() => setPlayBackRate()} // 비디오가 재생 가능할 때 재생 속도 설정
                >
                    <source src={bgChangeByClimate()} type="video/mp4"/>
                    {" "}
                    {/* 날씨에 따라 비디오 소스 설정 */}
                    <strong>Your browser does not support the video tag.</strong>
                </video>
            </div>
        </main>
    );
}

export default Weather;
