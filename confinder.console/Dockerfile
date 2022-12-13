#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["confinder.console/confinder.console.csproj", "confinder.console/"]
COPY ["confinder.application/confinder.application.csproj", "confinder.application/"]
RUN dotnet restore "confinder.console/confinder.console.csproj"
COPY . .
WORKDIR "/src/confinder.console"
RUN dotnet build "confinder.console.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "confinder.console.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "confinder.console.dll"]
