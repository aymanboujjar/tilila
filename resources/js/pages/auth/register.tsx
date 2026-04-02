import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/contexts/TranslationContext';
import { home, login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    const { t } = useTranslation();

    setLayoutProps({
        title: t('auth.register.layoutTitle'),
        description: t('auth.register.layoutDescription'),
    });

    return (
        <>
            <Head title={t('auth.register.headTitle')} />

            <div className="mb-6 flex justify-center">
                <Link
                    href={home()}
                    className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-beta-blue/40 focus-visible:ring-offset-2"
                >
                    <img
                        src="/assets/logo.webp"
                        alt="Tilila"
                        className="h-11 w-auto max-w-[220px] object-contain"
                        loading="eager"
                        decoding="async"
                    />
                </Link>
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    {t('auth.register.nameLabel')}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder={t(
                                        'auth.register.namePlaceholder',
                                    )}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {t('auth.register.emailLabel')}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder={t(
                                        'auth.common.emailPlaceholder',
                                    )}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    {t('auth.common.passwordLabel')}
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder={t(
                                        'auth.common.passwordPlaceholder',
                                    )}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    {t('auth.common.confirmPasswordLabel')}
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder={t(
                                        'auth.common.confirmPasswordPlaceholder',
                                    )}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                {t('auth.register.submit')}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {t('auth.register.haveAccount')}{' '}
                            <TextLink href={login()} tabIndex={6}>
                                {t('auth.register.loginLink')}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}
