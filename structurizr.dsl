workspace {
    properties {
        "structurizr.dslEditor" "false"
    }
    model {
        user = person "Usuário"
        confinder = softwaresystem "Confinder" "" {
            spa = container "Single-Page Application" "" "React" "Web Browser" {
                listPage = component "Conference List Page" "" "React Page" {
                    user -> this "Visualiza listagem de conferências com filtragem interativa em"
                }
                mapPage = component "Conference Map Page" "" "React Page" {
                    user -> this "Visualiza mapa de conferências com filtragem interativa em"
                }
                detailPage = component "Conference Detail Modal" "" "React Component" {
                    listPage -> this "Mostra detalhes de uma conferência em"
                    mapPage -> this "Mostra detalhes de uma conferência em"
                }
            
                user -> this "Visualiza conferências usando"
            }
            api = container "API" "" ".NET Core" {
                conferenceController = component "Conferences Controller" "" ".NET Core Controller" {
                    listPage -> this "Busca e filtra dados de conferências em" "JSON/HTTPS"
                    mapPage -> this "Busca e filtra dados de conferências em" "JSON/HTTPS"
                    detailPage -> this "Busca dados de uma conferência em" "JSON/HTTPS"
                }
                conferenceComponent = component "Conferences Component" "" ".NET Core Service" {
                    conferenceController -> this "Busca dados de conferências em"
                }
            }
            scrapper = container "Web Scrapper" "" ".NET Core" {
                cronComponent = component "Cron Component" "" ".NET Core Service"
                scrappingComponent = component "Scrapping Component" "" ".NET Core Service" {
                    cronComponent -> this "Executa"
                }
                geolocationComponent = component "Geolocation Component" "" ".NET Core Service" {
                    scrappingComponent -> this "Busca coordenadas da conferência em"
                }
                conferenceComponent2 = component "Conferences Component" "" ".NET Core Service" {
                    scrappingComponent -> this "Insere ou atualiza dados de conferências em"
                }
            }
            db = container "Conferences Database" "" "PostgreSQL" "Database" {
                conferenceComponent -> this "Lê dados de"
                conferenceComponent2 -> this "Lê e Escreve dados em"
            }
        }
        maps = softwaresystem "Google Maps API" "" "External System" {
            geolocationComponent -> this "Busca coordenadas geográficas da localização de conferências em" "JSON/HTTPS"
        }
        wikicfp = softwaresystem "Wiki CFP Web Application" "" "External System" {
            scrappingComponent -> this "Consome dados de conferências de" "HTTPS"
        }
        research = softwaresystem "Research Web Application" "" "External System" {
            scrappingComponent -> this "Consome dados de conferências de" "HTTPS"
        }
        conferenceSite = softwaresystem "Site da conferência" "" "External System" {
            detailPage -> this "Possibilida redirecionamento para" "HTTPS"
        }
    }
    views {
        systemcontext confinder "SystemContext" {
            include *
            autoLayout
        }
        container confinder "Containers" {
            include *
            autoLayout
        }
        component spa "SPA-Components" {
            include *
            autoLayout
        }
        component api "API-Components" {
            include *
            autoLayout
        }
        component scrapper "Scrapper-Components" {
            include *
            autoLayout
        }
        styles {
            element "External System" {
                background #999999
                color #ffffff
            }
            element "Web Browser" {
                shape WebBrowser
            }
            element "Database" {
                shape Cylinder
            }
        }
        theme default
    }
}