import React from "react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";

type EmailModalProps = {
  title: string;
  email: string;
  open: boolean;
  handleClose: () => void;
  handleResendEmail: () => void;
};

export default function EmailModal({
  title,
  email,
  open,
  handleClose,
  handleResendEmail,
}: EmailModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="email-confirmation-title"
      aria-describedby="email-confirmation-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "27px",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img
            src="/images/email-confirmation.svg"
            alt="Email Icon"
            style={{ width: 75 }}
          />
        </Box>
        <Typography
          id="email-confirmation-title"
          variant="h6"
          component="h2"
          sx={{
            color: "#4D3D6F",
            fontWeight: 500,
            fontFamily: "Kumbh Sans",
            fontStyle: "normal",
          }}
        >
          {title}
        </Typography>
        <Typography
          id="email-confirmation-description"
          sx={{ mt: 2, fontSize: "18px" }}
        >
          We have sent an email to {email} to confirm the validity of address.
        </Typography>
        <Divider />
        <div style={{ marginTop: "1rem", textTransform: "none" }}>
          <span
            style={{
              color: "#827997",
            }}
          >
            Have not received an email?
          </span>
          <span
            style={{
              color: "#4D3D6F",
              cursor: "pointer",
            }}
            onClick={handleResendEmail}
          >
            {" "}
            Resend mail.
          </span>
        </div>
      </Box>
    </Modal>
  );
}
