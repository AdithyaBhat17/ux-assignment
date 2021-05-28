import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Heading } from "@chakra-ui/layout";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { formatToPhone } from "../../lib/validatePhone";
import SuccessState from "./SuccessState";

function Subscribe({
  subscribe,
  close,
}: {
  subscribe: (
    phone: string,
    whatsapp: boolean
  ) => Promise<
    | {
        error: string;
        success?: undefined;
      }
    | {
        success: boolean;
        error: null;
      }
  >;
  close: () => void;
}) {
  const [whatsapp, setWhatsapp] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);

  const [isLoading, setLoading] = useState(false);

  const [status, setStatus] = useState<
    | {
        error: string;
        success?: undefined;
      }
    | {
        success: boolean;
        error: null;
      }
  >({ success: false, error: null });

  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatToPhone(e) ?? null);
    if (status.error) {
      setStatus({ ...status, error: "" });
    }
  };

  const subscribeHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone) return;
    setLoading(true);
    const status = await subscribe(phone, whatsapp);

    setStatus(status);
    setLoading(false);
  };

  useEffect(() => {
    if (!status.success) return;
    const timeout = setTimeout(() => {
      close();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  return (
    <div>
      {!status.success ? (
        <form onSubmit={subscribeHandler} method="post">
          <Heading size="md">Notify when available</Heading>
          <FormControl my="5" id="phone">
            <FormLabel fontWeight="normal">
              Provide your contact number below to receive a text as soon as
              this becomes available again.
            </FormLabel>
            <InputGroup size="lg">
              <InputLeftElement ml="2">
                <Button bg="celadonGreen" color="white" h="2rem" w="1.5rem">
                  +1
                </Button>
              </InputLeftElement>
              <Input
                onChange={phoneHandler}
                pl="4rem"
                autoFocus
                value={phone ?? ""}
                type="tel"
                placeHolder="713-123-1429"
              />
            </InputGroup>
            {status.error && (
              <FormHelperText color="red.500">{status.error}</FormHelperText>
            )}
          </FormControl>
          <Button
            isFullWidth
            bg="celadonGreen"
            color="white"
            _hover={{ bg: "deepJungleGreen" }}
            type="submit"
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            Register
          </Button>
          <FormControl my="5" id="whatsapp">
            <Checkbox
              checked={whatsapp}
              onChange={(e) => setWhatsapp(e.target.checked)}
              colorScheme="green"
              color="celadonGreen"
            >
              Notify via WhatsApp
            </Checkbox>
          </FormControl>
        </form>
      ) : (
        <SuccessState />
      )}
    </div>
  );
}

export default Subscribe;
