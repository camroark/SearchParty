System.register(['angular2/core', 'angular2/router', 'ng2-material/all', './searchparty-service', './chat.component', './map.component', './socket-service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, all_1, searchparty_service_1, chat_component_1, map_component_1, socket_service_1;
    var SearchPartyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (all_1_1) {
                all_1 = all_1_1;
            },
            function (searchparty_service_1_1) {
                searchparty_service_1 = searchparty_service_1_1;
            },
            function (chat_component_1_1) {
                chat_component_1 = chat_component_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            SearchPartyComponent = (function () {
                function SearchPartyComponent(_params, _searchPartyService, _socketService) {
                    var _this = this;
                    this._params = _params;
                    this._searchPartyService = _searchPartyService;
                    this._socketService = _socketService;
                    this.huntID = _params.get('huntID');
                    this.username = _params.get('username');
                    this._socketService.createSocket(this.huntID);
                    this.getHuntData(this.huntID);
                    this._searchPartyService.taskChange.subscribe(function (tasks) { return _this.allTasks = tasks; });
                }
                SearchPartyComponent.prototype.getHuntData = function (id) {
                    this._searchPartyService.getHunt(id);
                };
                SearchPartyComponent = __decorate([
                    core_1.Component({
                        selector: 'my-searchparty',
                        templateUrl: './share/app/searchparty.component.html',
                        styleUrls: ['./share/app/searchparty.component.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            all_1.MATERIAL_DIRECTIVES,
                            chat_component_1.ChatComponent,
                            map_component_1.MapComponent
                        ],
                        providers: [
                            all_1.MATERIAL_PROVIDERS,
                            searchparty_service_1.SearchPartyService,
                            socket_service_1.SocketService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, searchparty_service_1.SearchPartyService, socket_service_1.SocketService])
                ], SearchPartyComponent);
                return SearchPartyComponent;
            }());
            exports_1("SearchPartyComponent", SearchPartyComponent);
        }
    }
});
//# sourceMappingURL=searchparty.component.js.map