import api from "./api";

const normalizeCall = (call) => {
    const duration = Number(call.duration ?? call.callDuration ?? 0);
    const cost = Number(call.callCost ?? call.cost ?? duration * 0.12 ?? 0);
    const timestamp = call.timestamp ?? call.callStartTime ?? call.createdAt ?? new Date().toISOString();
    const callType = call.callType ?? call.call_type ?? "Incoming";

    return {
        id: call._id ?? call.id,
        callerName: call.callerName ?? call.caller_name ?? call.callerNumber ?? call.caller_number ?? "Unknown",
        callerNumber: call.callerNumber ?? call.caller_number ?? "",
        receiverNumber: call.receiverNumber ?? call.receiver_number ?? "",
        city: call.city ?? "",
        callDuration: Number.isFinite(duration) ? duration : 0,
        callCost: Number.isFinite(cost) ? cost : 0,
        callStartTime: timestamp,
        callType,
        callStatus: call.callStatus ?? call.status ?? true,
        timestamp,
    };
};


export const fetchCalls = async (page = 1, limit = 8) => {

    const response = await api.get("/cdr", {
        params: {
            page,
            limit,
        },
    });

    const payload = response?.data?.data ?? [];

    return {
        calls: payload.map(normalizeCall),
        totalRecords: response.data.totalRecords,
        totalPages: response.data.totalPages,
        currentPage: response.data.page,
    };
};
/*export const fetchCalls = async () => {
    const response = await api.get("/cdr", {
        params: {
            page: 1,
            limit: 20,
        },
    });
    const payload = response?.data?.data ?? response?.data?.records ?? [];

    return Array.isArray(payload) ? payload.map(normalizeCall) : [];
};*/

export const fetchAnalytics = async () => {
    const response = await api.get("/cdr/analytics");
    return response?.data ?? {};
};