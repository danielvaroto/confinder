#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["confinder.ui.console/confinder.ui.console.csproj", "confinder.ui.console/"]
RUN dotnet restore "confinder.ui.console/confinder.ui.console.csproj"
COPY . .
WORKDIR "/src/confinder.ui.console"
RUN dotnet build "confinder.ui.console.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "confinder.ui.console.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "confinder.ui.console.dll"]
