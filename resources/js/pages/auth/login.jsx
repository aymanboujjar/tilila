import { Form, Head, router, setLayoutProps, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/contexts/TranslationContext';
import { cn } from '@/lib/utils';
import { store as loginForm } from '@/routes/login';
import { request } from '@/routes/password';

const DEMO_PASSWORD = 'password';

const DEMO_ACCOUNTS = {
    admin: { email: 'test.admin@example.com', password: DEMO_PASSWORD },
    expert: { email: 'test.expert@example.com', password: DEMO_PASSWORD },
};

const fieldClassName =
    'border-border bg-twhite text-tblack placeholder:text-tgray focus-visible:border-beta-blue focus-visible:ring-beta-blue/25';

const textareaClass = cn(
    'flex min-h-[100px] w-full rounded-md border border-border bg-twhite px-3 py-2 text-sm text-tblack shadow-sm outline-none placeholder:text-tgray',
    'focus-visible:border-beta-blue focus-visible:ring-2 focus-visible:ring-beta-blue/25 focus-visible:ring-offset-2',
);

function ModeToggle({ mode, onModeChange, t }) {
    return (
        <div className="grid grid-cols-2 gap-1 rounded-full border border-border bg-muted/40 p-1">
            <button
                type="button"
                onClick={() => onModeChange('login')}
                className={cn(
                    'rounded-full px-3 py-2 text-sm font-semibold transition',
                    mode === 'login'
                        ? 'bg-background text-tblack shadow-sm'
                        : 'text-tgray hover:text-tblack',
                )}
            >
                {t('auth.login.modeSignIn')}
            </button>
            <button
                type="button"
                onClick={() => onModeChange('request')}
                className={cn(
                    'rounded-full px-3 py-2 text-sm font-semibold transition',
                    mode === 'request'
                        ? 'bg-background text-tblack shadow-sm'
                        : 'text-tgray hover:text-tblack',
                )}
            >
                {t('auth.login.modeRequestAccount')}
            </button>
        </div>
    );
}

function RequestAccountForm({ t }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: '',
        email: '',
        reason: '',
        organization: '',
        profession: '',
    });

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        post('/access-request/apply');
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-6">
            <p className="text-sm leading-6 text-tgray">
                {t('auth.login.requestAccountHint')}
            </p>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="request_name" className="text-tblack">
                        {t('auth.register.nameLabel')}
                    </Label>
                    <Input
                        id="request_name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        placeholder={t('auth.register.namePlaceholder')}
                        className={fieldClassName}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="request_email" className="text-tblack">
                        {t('auth.login.emailLabel')}
                    </Label>
                    <Input
                        id="request_email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                        placeholder={t('auth.common.emailPlaceholder')}
                        className={fieldClassName}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="request_profession" className="text-tblack">
                        {t('accessRequest.create.professionLabel')}
                    </Label>
                    <Input
                        id="request_profession"
                        value={data.profession}
                        onChange={(e) => setData('profession', e.target.value)}
                        required
                        placeholder={t(
                            'accessRequest.create.professionPlaceholder',
                        )}
                        className={fieldClassName}
                    />
                    <InputError message={errors.profession} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="request_organization" className="text-tblack">
                        {t('accessRequest.create.organizationLabel')}
                    </Label>
                    <Input
                        id="request_organization"
                        value={data.organization}
                        onChange={(e) =>
                            setData('organization', e.target.value)
                        }
                        placeholder={t(
                            'accessRequest.create.organizationPlaceholder',
                        )}
                        className={fieldClassName}
                    />
                    <InputError message={errors.organization} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="request_reason" className="text-tblack">
                        {t('accessRequest.create.reasonLabel')}
                    </Label>
                    <textarea
                        id="request_reason"
                        required
                        rows={4}
                        className={textareaClass}
                        value={data.reason}
                        onChange={(e) => setData('reason', e.target.value)}
                        placeholder={t(
                            'accessRequest.create.reasonPlaceholder',
                        )}
                    />
                    <InputError message={errors.reason} />
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="mt-2 w-full rounded-full bg-beta-blue text-sm font-semibold text-twhite shadow-sm transition hover:bg-beta-blue/90"
                >
                    {processing && <Spinner />}
                    {t('auth.login.requestAccountSubmit')}
                </Button>
            </div>
        </form>
    );
}

export default function Login({
    status,
    canResetPassword,
    showDemoLogins = false,
}) {
    const { t } = useTranslation();
    const flash = usePage().props?.flash ?? {};
    const [mode, setMode] = useState('login');
    const [demoRole, setDemoRole] = useState(null);

    useEffect(() => {
        setLayoutProps({
            title:
                mode === 'login'
                    ? t('auth.login.layoutTitle')
                    : t('auth.login.requestLayoutTitle'),
            description:
                mode === 'login'
                    ? t('auth.login.layoutDescription')
                    : t('auth.login.requestLayoutDescription'),
        });
    }, [mode, t]);

    const loginAsDemo = (role) => {
        setDemoRole(role);
        router.post(
            loginForm.url(),
            { ...DEMO_ACCOUNTS[role], remember: false },
            { onFinish: () => setDemoRole(null) },
        );
    };

    return (
        <>
            <Head title={t('auth.login.headTitle')} />

            <div className="flex flex-col gap-6 text-tblack">
                <ModeToggle mode={mode} onModeChange={setMode} t={t} />

                {flash.success ? (
                    <div className="rounded-lg border border-beta-green/40 bg-beta-green/10 px-4 py-3 text-sm font-medium text-alpha-green">
                        {flash.success}
                    </div>
                ) : null}

                {flash.warning ? (
                    <div className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-tgray">
                        {flash.warning}
                    </div>
                ) : null}

                {mode === 'login' ? (
                    <Form
                        {...loginForm.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-tblack"
                                        >
                                            {t('auth.login.emailLabel')}
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder={t(
                                                'auth.common.emailPlaceholder',
                                            )}
                                            className={fieldClassName}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label
                                                htmlFor="password"
                                                className="text-tblack"
                                            >
                                                {t(
                                                    'auth.common.passwordLabel',
                                                )}
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request.url()}
                                                    className="ml-auto text-sm font-semibold text-beta-blue decoration-beta-blue/30 hover:text-beta-blue hover:decoration-beta-blue"
                                                    tabIndex={5}
                                                >
                                                    {t(
                                                        'auth.login.forgotPassword',
                                                    )}
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder={t(
                                                'auth.common.passwordPlaceholder',
                                            )}
                                            className={fieldClassName}
                                        />
                                        <InputError
                                            message={errors.password}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="text-sm text-tgray"
                                        >
                                            {t('auth.login.rememberMe')}
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full rounded-full bg-beta-blue text-sm font-semibold text-twhite shadow-sm transition hover:bg-beta-blue/90 focus-visible:ring-2 focus-visible:ring-beta-blue/40 focus-visible:ring-offset-2"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        {t('auth.login.submit')}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                ) : (
                    <RequestAccountForm t={t} />
                )}

                {showDemoLogins && mode === 'login' && (
                    <div className="flex flex-col gap-3 border-t border-border pt-6">
                        <p className="text-center text-xs font-medium tracking-wide text-tgray uppercase">
                            {t('auth.login.demoDivider')}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full rounded-full border-border text-sm font-semibold text-tblack hover:bg-tblack/5"
                                disabled={demoRole !== null}
                                data-test="demo-login-admin"
                                onClick={() => loginAsDemo('admin')}
                            >
                                {demoRole === 'admin' && <Spinner />}
                                {t('auth.login.demoAdmin')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full rounded-full border-border text-sm font-semibold text-tblack hover:bg-tblack/5"
                                disabled={demoRole !== null}
                                data-test="demo-login-expert"
                                onClick={() => loginAsDemo('expert')}
                            >
                                {demoRole === 'expert' && <Spinner />}
                                {t('auth.login.demoExpert')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {status && (
                <div className="mt-4 rounded-lg border border-border bg-beta-green px-4 py-3 text-center text-sm font-medium text-alpha-green">
                    {status}
                </div>
            )}
        </>
    );
}
