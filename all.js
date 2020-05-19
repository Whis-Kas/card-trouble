        // API 來源
        // https://opendata.epa.gov.tw/Data/Contents/AQI/
        Vue.component('card', {
            template: '#cardance',
            props: ['cityData', 'starStatus'],
            computed: {
                colorStatus() {
                    const status = {
                        '良好': 'status-aqi1',
                        '普通': 'status-aqi2',
                        '對敏感族群不健康': 'status-aqi3',
                        '對所有族群不健康': 'status-aqi4',
                        '非常不健康': 'status-aqi5',
                        '危害': 'status-aqi6'
                    }
                    return status[this.cityData.Status]
                }
            },
            methods: {
                staredClick() {
                    this.$emit('star-click', this.cityData.SiteName)
                },
                fuck() {
                    this.$emit('testest', this.cityData.SiteName)
                }
            }
        })
        var app = new Vue({
            el: '#app',
            data: {
                data: [],
                location: [],
                stared: [],
                filter: '全部城市',
            },
            // 請在此撰寫 JavaScript
            methods: {
                selectOption() {
                    const vm = this;
                    vm.data.forEach((item) => {
                        vm.location.push(item.County)
                    })
                    vm.location = vm.location.filter((prev, item, index) => {
                        return index.indexOf(prev) === item
                    })
                },
                addStar(siteName) {
                    if (!this.stared.includes(siteName)) {
                        this.stared.push(siteName)
                    }
                    this.svaeStar()
                },
                removeStar(siteName) {
                    if (this.stared.includes(siteName)) {
                        let index = this.stared.indexOf(siteName)
                        if (index >= 0) {
                            this.stared.splice(index, 1)
                        }
                    }
                    this.svaeStar()
                },
                svaeStar() {
                    localStorage.setItem('stared', this.stared)
                },
                getData() {
                    const vm = this;
                    const api = 'http://opendata2.epa.gov.tw/AQI.json';

                    // 使用 jQuery ajax
                    $.get(api).then(function( response ) {
                        vm.data = response;
                        vm.selectOption()
                    });
                    
                },
            },
            computed: {
                filterData() {
                    const vm = this
                    if (vm.filter == '全部城市') {
                        return vm.data
                    } else {
                        return vm.data.filter((item) => {
                            return item.County == vm.filter
                        })
                    }
                }
            },
            mounted() {
                this.stared = localStorage.getItem('stared').split(',')
                this.getData()
            },
        });