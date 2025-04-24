import { useSession } from "@/hooks/useSession";
import { app } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";
import { navigate } from "astro:transitions/client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "sonner";
import { SignoutButton } from "./SignoutButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const auth = getAuth(app);
auth.setPersistence;

export function LoginFormContainer() {
  const [showRegister, setShowRegister] = useState(false);

  const { isLoggedIn } = useSession();

  if (isLoggedIn === null) return null;

  return isLoggedIn ? (
    <SignoutButton />
  ) : (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenido a SlamStats
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Inicia sesión con tu cuenta de SlamStats
      </p>
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <a>
        <button
          className="text-neutral-600 text-sm dark:text-neutral-300 mt-4"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister
            ? "Ya tienes una cuenta? Inicia sesión"
            : "No tienes una cuenta? Registrate"}
        </button>
      </a>
    </div>
  );
}

const validateField = (field: string, value: string) => {
  let error;

  switch (field) {
    case "email":
      if (!value) {
        error = "El email es obligatorio";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "El email es inválido";
      }
      break;
    case "password":
      if (!value) {
        error = "La contraseña es obligatoria";
      } else if (value.length < 6) {
        error = "La contraseña debe tener al menos 6 caracteres";
      }
      break;
    case "name":
      if (!value) {
        error = "El nombre es obligatorio";
      }
      break;
    default:
      break;
  }

  return error;
};

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    toast.loading("Iniciando sesión...");

    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );

    const idToken = await userCredential.user.getIdToken();

    try {
      const response = await fetch("/api/auth/signin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      toast.dismiss();

      if (!response.ok) {
        throw new Error(await response.text());
      }

      if (response.redirected) {
        navigate(response.url);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          value={formData.email}
          onChange={handleFieldChange}
          className={errors.email && "border-red-500"}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          placeholder="••••••••"
          type="password"
          value={formData.password}
          onChange={handleFieldChange}
          className={errors.password && "border-red-500"}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Iniciar sesión &rarr;
        <BottomGradient />
      </button>
    </form>
  );
}

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    toast.loading("Creando cuenta...");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.dismiss();

      if (!response.ok) {
        throw new Error(await response.text());
      }

      if (response.redirected) {
        navigate(response.url);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFieldChange}
          className={errors.name && "border-red-500"}
          placeholder="Durden"
          type="text"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="projectmayhem@fc.com"
          value={formData.email}
          onChange={handleFieldChange}
          className={errors.email && "border-red-500"}
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleFieldChange}
          className={errors.password && "border-red-500"}
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Registrarse &rarr;
        <BottomGradient />
      </button>
    </form>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
