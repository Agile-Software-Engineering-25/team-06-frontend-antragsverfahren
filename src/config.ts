const BACKEND_BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:8080/' : 'https://sau-portal.de/api/antrag/';

export { BACKEND_BASE_URL };
