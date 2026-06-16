import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminPartnerForm({ partner }) {
    const isEdit = Boolean(partner?.id);
    const { data, setData, post, processing, errors } = useForm({
        program: partner?.program ?? 'tilila',
        group: partner?.group ?? 'featured',
        name: partner?.name ?? '',
        subtitle: {
            fr: partner?.subtitle?.fr ?? '',
            en: partner?.subtitle?.en ?? '',
            ar: partner?.subtitle?.ar ?? '',
        },
        meta: {
            role: {
                fr: partner?.meta?.role?.fr ?? '',
                en: partner?.meta?.role?.en ?? '',
                ar: partner?.meta?.role?.ar ?? '',
            },
            edition: {
                fr: partner?.meta?.edition?.fr ?? '',
                en: partner?.meta?.edition?.en ?? '',
                ar: partner?.meta?.edition?.ar ?? '',
            },
        },
        url: partner?.url ?? '',
        logo_path: partner?.logo_path ?? '',
        sort: partner?.sort ?? 0,
        is_published: partner?.is_published ?? true,
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/partners/${partner.id}`, {
                forceFormData: true,
                _method: 'put',
            });
        } else {
            post('/admin/partners', { forceFormData: true });
        }
    };

    return (
        <AppLayout>
            <Head title={isEdit ? 'Edit partner' : 'New partner'} />
            <form onSubmit={submit} className="mx-auto max-w-2xl space-y-4 p-6">
                <h1 className="text-2xl font-bold">
                    {isEdit ? 'Edit' : 'New'} partner
                </h1>
                <div>
                    <Label>Program</Label>
                    <select
                        className="w-full rounded-md border px-3 py-2"
                        value={data.program}
                        onChange={(e) => setData('program', e.target.value)}
                    >
                        <option value="tilila">Tilila Awards</option>
                        <option value="tililab">Tililab</option>
                        <option value="both">Both</option>
                    </select>
                </div>
                <div>
                    <Label>Group</Label>
                    <select
                        className="w-full rounded-md border px-3 py-2"
                        value={data.group}
                        onChange={(e) => setData('group', e.target.value)}
                    >
                        <option value="featured">featured</option>
                        <option value="institutional">institutional</option>
                        <option value="media">media</option>
                        <option value="program">program</option>
                        <option value="organiser">organiser</option>
                        <option value="strip">strip</option>
                    </select>
                </div>
                <div>
                    <Label>Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name ? (
                        <p className="text-sm text-red-600">{errors.name}</p>
                    ) : null}
                </div>
                <div>
                    <Label>Subtitle (FR)</Label>
                    <Input
                        value={data.subtitle.fr}
                        onChange={(e) =>
                            setData('subtitle', {
                                ...data.subtitle,
                                fr: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <Label>Subtitle (EN)</Label>
                    <Input
                        value={data.subtitle.en}
                        onChange={(e) =>
                            setData('subtitle', {
                                ...data.subtitle,
                                en: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <Label>Subtitle (AR)</Label>
                    <Input
                        value={data.subtitle.ar}
                        onChange={(e) =>
                            setData('subtitle', {
                                ...data.subtitle,
                                ar: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <Label>Logo file</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setData('logo', e.target.files?.[0] ?? null)
                        }
                    />
                    {partner?.logo_url ? (
                        <img
                            src={partner.logo_url}
                            alt=""
                            className="mt-2 h-16 object-contain"
                        />
                    ) : null}
                </div>
                <div>
                    <Label>Logo path (optional)</Label>
                    <Input
                        value={data.logo_path}
                        placeholder="/assets/PartenairesInstitutionnels/logo.png"
                        onChange={(e) => setData('logo_path', e.target.value)}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                        Use a public asset path when you are not uploading a
                        new file.
                    </p>
                </div>
                <div>
                    <Label>Website URL</Label>
                    <Input
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                    />
                </div>
                <div>
                    <Label>Sort order</Label>
                    <Input
                        type="number"
                        value={data.sort}
                        onChange={(e) =>
                            setData('sort', Number(e.target.value))
                        }
                    />
                </div>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={data.is_published}
                        onChange={(e) =>
                            setData('is_published', e.target.checked)
                        }
                    />
                    Published
                </label>
                <Button type="submit" disabled={processing}>
                    Save
                </Button>
            </form>
        </AppLayout>
    );
}
