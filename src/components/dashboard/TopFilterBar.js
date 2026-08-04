import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function TopFilterBar({
  filter,
  setFilter,
  filtersList,


paymentFilter,
setPaymentFilter,



  search,
  setSearch,

  date,
  setDate,

  activeView,
  setActiveView,

  extraButtons = [],
})


{
  const { t } = useTranslation();
    const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="card-driver d-flex justify-content-between align-items-center px-3 mb-3">

      {/* LEFT */}
      <div className="d-flex gap-2 align-items-center">

        {/* FILTERS */}
        {filtersList.map((f) => (
          <Button
            key={f}
            size="sm"
            onClick={() => {
              setFilter(f);
              setActiveView && setActiveView("");
            }}
            style={{
              background:
                filter === f
                  ? "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))"
                  : "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "20px",
              color: filter === f ? "white" : "#cbd5f5",
              fontSize: "11px",
            }}
          >
            {t(`filters.${f.toLowerCase()}`)}
          </Button>
        ))}

      {extraButtons.map((btn) => (
  <div
    key={btn.key}
    className={btn.className}
    onClick={() => {
      if (btn.type === "dropdown") {
        setOpenDropdown(openDropdown === btn.key ? null : btn.key);
      } else {
        btn.onClick && btn.onClick();
      }
    }}
    style={{
      position: "relative",
      background:
        activeView === btn.key
          ? "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))"
          : "rgba(255,255,255,0.08)",
      color: activeView === btn.key ? "white" : "#cbd5f5",
      borderRadius: "20px",
      padding: "6px 12px",
      cursor: "pointer",
    }}
  >
    {btn.content}

    {btn.type === "dropdown" && openDropdown === btn.key && (
      <div className="tf-dropdown-menu">
        {btn.options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => {
              btn.onSelect(opt.value);
              setOpenDropdown(null);
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    )}
  </div>
))}

      </div>

      {/* RIGHT */}
     {/* RIGHT */}
<div className="d-flex gap-2 align-items-center">

  {setPaymentFilter && (
  <Form.Select
    value={paymentFilter}
    
    onChange={(e) => setPaymentFilter(e.target.value)}
    className="custom-select"
    style={{ width: "150px" }}
  >
<option value="All">{t("common.all")}</option>
<option value="Cash">{t("payment.cash")}</option>
<option value="Electronic">{t("payment.electronic")}</option>
  </Form.Select>
)}

  {/* DATE */}
  <Form.Control
    type="date"
    value={date}
    onChange={(e) => {
      setDate(e.target.value);
      setActiveView && setActiveView("");
    }}
    style={{
      width: "170px",
      borderRadius: "10px",
      color: "white",
      background: "rgba(255,255,255,0.08)",
    }}
  />

  {/* SEARCH */}
  <Form.Control
    type="text"
   placeholder={t("booking.searchPlaceholder")}
    className="custom-input-driver"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setActiveView && setActiveView("");
    }}
    style={{
      width: "220px",
      borderRadius: "10px",
      color: "white",
      background: "rgba(255,255,255,0.08)",
    }}
  />

</div>

    </div>
  );
}
